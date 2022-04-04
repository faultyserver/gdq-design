from dataclasses import dataclass
import json
from os import path
from pathlib import Path
import typing as t

SRC_ROOT = Path(path.realpath(path.join(path.dirname(__file__), "..", "src")))

TOKEN_PATH = SRC_ROOT / "definitions" / "base_tokens.json"
THEME_PATH = SRC_ROOT / "definitions" / "themes.json"
GENERATED_CSS_COLORS_PATH = SRC_ROOT / "generated" / "ColorTokens.module.css"
GENERATED_CSS_FONTS_PATH = SRC_ROOT / "generated" / "FontTokens.module.css"
GENERATED_CSS_THEMES_PATH = SRC_ROOT / "generated" / "Themes.module.css"


RawColorMap = t.Dict[str, str]
RawColorScaleMap = t.Dict[str, t.List[str]]


@dataclass
class BaseTokens:
    name: str
    description: str
    scaleNames: t.List[str]
    colors: RawColorScaleMap
    staticColors: RawColorMap
    fonts: t.Dict[str, str]
    fontSizes: t.List[str]
    lineHeights: t.Dict[str, str]


def load_base_tokens(defs_file: Path) -> BaseTokens:
    with open(defs_file, "r") as file:
        return BaseTokens(**json.load(file))


@dataclass
class ThemeDefinitions:
    themes: t.List[str]
    tokens: t.Dict[str, t.List[str]]


def load_theme_definitions(defs_file: Path) -> ThemeDefinitions:
    with open(defs_file, "r") as file:
        return ThemeDefinitions(**json.load(file))


@dataclass
class Color:
    name: str
    value: str
    group: t.Optional[str]


def generate_color_tokens(
    colors: RawColorScaleMap, scaleNames: t.List[str], staticColors: RawColorMap
) -> t.List[Color]:
    tokens: t.List[Color] = []
    for (name, color) in colors.items():
        for (value, scale) in zip(color, scaleNames):
            tokens.append(Color(f"{name}-{scale}", value, group=name))

    for (name, value) in staticColors.items():
        tokens.append(Color(name, value, group="static"))

    return tokens


def write_color_tokens(file_path: Path, colors: t.List[Color]):
    with open(file_path, "w") as file:
        file.write(
            """/** Generated Color Tokens. Do not edit manually **/\n\n:root {\n"""
        )

        grouped_colors = {}
        for color in colors:
            color_list = grouped_colors.get(color.group, [])
            color_list.append(color)
            grouped_colors[color.group] = color_list

        for (group, color_list) in grouped_colors.items():
            file.write(f"  /** {group} **/\n")
            for color in sorted(color_list, key=lambda color: color.name):
                file.write(f"  --{color.name}: {color.value};\n")
            file.write(f"\n")

        file.write("}\n")


def write_font_tokens(file_path: Path, fonts: t.Dict[str, str]):
    with open(file_path, "w") as file:
        file.write(
            """/** Generated Font Tokens. Do not edit manually **/\n\n:root {\n"""
        )

        for (name, stack) in fonts.items():
            file.write(f"  --font-{name}: {stack};\n")

        file.write("}\n")


def write_theme_tokens(file_path: Path, theme_map: ThemeDefinitions):
    theme_names = theme_map.themes
    tokens_by_theme: t.Dict[str, t.Dict[str, str]] = {}
    for theme in theme_names:
        tokens_by_theme[theme] = {}

    for (name, theme_values) in theme_map.tokens.items():
        for (index, value) in enumerate(theme_values):
            theme = theme_names[index]
            tokens_by_theme[theme][name] = value

    with open(file_path, "w") as file:
        file.write("""/** Generated Theme Tokens. Do not edit manually **/\n\n""")

        for (theme, tokens) in tokens_by_theme.items():
            file.write(f":global(.theme-{theme}) {{\n")
            for (token, value) in tokens.items():
                file.write(f"  --{token}: var(--{value});\n")
            file.write("}\n\n")


base_tokens = load_base_tokens(TOKEN_PATH)
theme_definitions = load_theme_definitions(THEME_PATH)

colors = generate_color_tokens(
    base_tokens.colors,
    base_tokens.scaleNames,
    base_tokens.staticColors,
)

print(f"Writing color tokens to {GENERATED_CSS_COLORS_PATH}")
write_color_tokens(GENERATED_CSS_COLORS_PATH, colors)
print(f"Writing font tokens to {GENERATED_CSS_FONTS_PATH}")
write_font_tokens(GENERATED_CSS_FONTS_PATH, base_tokens.fonts)
print(f"Writing themes to {GENERATED_CSS_COLORS_PATH}")
write_theme_tokens(GENERATED_CSS_THEMES_PATH, theme_definitions)
