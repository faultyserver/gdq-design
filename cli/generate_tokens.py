from io import TextIOWrapper
from os import path
from pathlib import Path
import typing as t

from color import Color
from config import Config, BaseTokens, ThemeMap, ThemeToken

PROJECT_ROOT = Path(path.realpath(path.join(path.dirname(__file__), "..")))
DEFINITIONS_ROOT = PROJECT_ROOT / "definitions"
TOKEN_PATH = DEFINITIONS_ROOT / "base_tokens.json"
THEME_PATH = DEFINITIONS_ROOT / "themes.json"

GENERATED_ROOT = PROJECT_ROOT / "src" / "generated"
GENERATED_CSS_COLORS_PATH = GENERATED_ROOT / "ColorTokens.module.css"
GENERATED_CSS_FONTS_PATH = GENERATED_ROOT / "FontTokens.module.css"
GENERATED_CSS_THEMES_PATH = GENERATED_ROOT / "Themes.module.css"


def write_color_tokens(file_path: Path, tokens: BaseTokens):
    with open(file_path, "w") as file:
        file.write(
            """/** Generated Color Tokens. Do not edit manually **/\n\n:root {\n"""
        )

        grouped_colors = {}
        for (name, token) in tokens.colors.items():
            token_list = grouped_colors.get(token.group, [])
            token_list.append(token)
            grouped_colors[token.group] = token_list

        for (group, token_list) in grouped_colors.items():
            file.write(f"  /** {group} **/\n")
            for token in sorted(token_list, key=lambda token: token.name):
                file.write(f"  --{token.name}: {token.color.to_hex()};\n")
            file.write(f"\n")

        file.write("}\n")


def write_font_tokens(
    file_path: Path, fonts: t.Dict[str, str], font_weights: t.Dict[str, int]
):
    with open(file_path, "w") as file:
        file.write(
            """/** Generated Font Tokens. Do not edit manually **/\n\n:root {\n"""
        )

        for (name, stack) in fonts.items():
            file.write(f"  --font-{name}: {stack};\n")

        for (name, weight) in font_weights.items():
            file.write(f"  --font-weight-{name}: {weight};\n")

        file.write("}\n")


def write_theme_tokens(file_path: Path, theme_map: ThemeMap):
    theme_names = theme_map.themes

    def write_token(
        file: TextIOWrapper, token: ThemeToken, name: t.Optional[str] = None
    ):
        name = name or token.name
        value = token.value
        if isinstance(value, Color):
            file.write(f"  --{name}: {value.to_rgba()};\n")
        else:
            file.write(f"  --{name}: var(--{value});\n")

    with open(file_path, "w") as file:
        file.write("""/** Generated Theme Tokens. Do not edit manually **/\n\n""")

        # Write the accent definitions first
        for (accent, tokens) in theme_map.accents.items():
            for (index, theme) in enumerate(theme_names):
                file.write(f":global(.theme-{theme}.accent-{accent}) {{\n")
                for (token, value) in tokens.items():
                    write_token(file, value[index], f"accent-{token}")
                file.write("}\n\n")

        # Then write the comprehensive theme definitions
        for (theme, tokens) in theme_map.theme_tokens.items():
            file.write(f":global(.theme-{theme}) {{\n")
            for token in tokens:
                write_token(file, token)
            # Include a `color-scheme` definition to hint at browser user agents
            file.write(f"  color-scheme: {theme};\n")
            file.write("}\n\n")


config = Config(TOKEN_PATH, THEME_PATH)

print(f"Writing color tokens to {GENERATED_CSS_COLORS_PATH}")
write_color_tokens(GENERATED_CSS_COLORS_PATH, config.base_tokens)
print(f"Writing font tokens to {GENERATED_CSS_FONTS_PATH}")
write_font_tokens(
    GENERATED_CSS_FONTS_PATH, config.base_tokens.fonts, config.base_tokens.fontWeights
)
print(f"Writing themes to {GENERATED_CSS_COLORS_PATH}")
write_theme_tokens(GENERATED_CSS_THEMES_PATH, config.themes)
