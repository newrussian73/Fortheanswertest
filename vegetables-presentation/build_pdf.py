#!/usr/bin/env python3
"""Generate a structured 3-slide PDF presentation about vegetable benefits."""

from pathlib import Path
from fpdf import FPDF

ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / "assets"
OUT = ROOT / "polza-ovoshey.pdf"
ART = Path("/opt/cursor/artifacts/polza-ovoshey.pdf")

# 16:9 presentation size in mm
W, H = 338.67, 190.5

GREEN_DEEP = (31, 61, 47)
GREEN = (47, 107, 79)
GREEN_SOFT = (231, 240, 234)
SAND = (247, 244, 236)
MUTED = (91, 106, 98)
WHITE = (255, 255, 255)


class Presentation(FPDF):
    def __init__(self):
        # Custom 16:9 size: pass final width/height directly (no landscape swap).
        super().__init__(orientation="P", unit="mm", format=(W, H))
        self.set_auto_page_break(auto=False)
        self.add_font("DejaVu", "", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")
        self.add_font("DejaVu", "B", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf")
        self.add_font("Serif", "", "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf")
        self.add_font("Serif", "B", "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf")

    def add_bg(self, name: str):
        self.add_page()
        self.image(str(ASSETS / name), x=0, y=0, w=W, h=H)

    def rect_fill(self, x, y, w, h, color):
        self.set_fill_color(*color)
        self.rect(x, y, w, h, style="F")

    def footer_bar(self, left: str, page: str, light=True):
        color = (230, 235, 228) if light else (80, 95, 86)
        self.set_text_color(*color)
        self.set_font("DejaVu", "", 9)
        self.set_xy(16, H - 14)
        self.cell(120, 6, left)
        self.set_xy(W - 40, H - 14)
        self.cell(24, 6, page, align="R")


def draw_wrapped(pdf: Presentation, text: str, x: float, y: float, w: float, size=11, color=MUTED, bold=False, line_h=5.5):
    pdf.set_xy(x, y)
    pdf.set_font("DejaVu", "B" if bold else "", size)
    pdf.set_text_color(*color)
    pdf.multi_cell(w, line_h, text)
    return pdf.get_y()


def slide_1(pdf: Presentation):
    pdf.add_bg("slide1.png")
    # left dark veil
    pdf.set_fill_color(18, 36, 26)
    # approximate veil with translucent-looking solid strip
    pdf.set_fill_color(18, 36, 26)
    with pdf.local_context(fill_opacity=0.72):
        pdf.rect(0, 0, 168, H, style="F")
    with pdf.local_context(fill_opacity=0.35):
        pdf.rect(168, 0, 50, H, style="F")

    pdf.set_text_color(200, 230, 201)
    pdf.set_font("DejaVu", "B", 10)
    pdf.set_xy(18, 28)
    pdf.cell(140, 6, "ЗДОРОВЬЕ  ·  ПИТАНИЕ  ·  ЭНЕРГИЯ")

    pdf.set_text_color(*SAND)
    pdf.set_font("Serif", "B", 42)
    pdf.set_xy(18, 48)
    pdf.multi_cell(150, 18, "Польза овощей")

    y = draw_wrapped(
        pdf,
        "Простая ежедневная привычка, которая поддерживает энергию, иммунитет и самочувствие.",
        18,
        95,
        145,
        size=13,
        color=(235, 232, 224),
        line_h=7,
    )

    # structure chips
    chips = ["3 слайда", "Польза", "Практика"]
    x = 18
    for chip in chips:
        pdf.set_fill_color(47, 107, 79)
        pdf.set_text_color(*SAND)
        pdf.set_font("DejaVu", "B", 9)
        tw = pdf.get_string_width(chip) + 10
        pdf.rect(x, y + 12, tw, 9, style="F")
        pdf.set_xy(x, y + 13.5)
        pdf.cell(tw, 6, chip, align="C")
        x += tw + 5

    pdf.footer_bar("Мини-презентация", "01 / 03", light=True)


def benefit_row(pdf, x, y, num, title, text, box_w):
    pdf.set_fill_color(*GREEN_SOFT)
    pdf.ellipse(x, y, 10, 10, style="F")
    pdf.set_text_color(*GREEN_DEEP)
    pdf.set_font("DejaVu", "B", 8)
    pdf.set_xy(x, y + 2.2)
    pdf.cell(10, 5, num, align="C")

    pdf.set_xy(x + 13, y)
    pdf.set_font("DejaVu", "B", 11)
    pdf.set_text_color(*GREEN_DEEP)
    pdf.cell(box_w - 20, 5, title)
    draw_wrapped(pdf, text, x + 13, y + 6, box_w - 22, size=9.5, color=MUTED, line_h=4.6)
    return y + 22


def slide_panel(pdf: Presentation, bg: str, badge: str, title: str, subtitle: str, items: list[tuple[str, str, str]], page: str):
    pdf.add_bg(bg)
    # right panel
    panel_x, panel_y, panel_w, panel_h = 170, 18, 152, 154
    with pdf.local_context(fill_opacity=0.94):
        pdf.set_fill_color(*SAND)
        pdf.rect(panel_x, panel_y, panel_w, panel_h, style="F")

    # accent bar
    pdf.set_fill_color(*GREEN)
    pdf.rect(panel_x, panel_y, 3.2, panel_h, style="F")

    # badge
    pdf.set_fill_color(*GREEN_SOFT)
    pdf.set_text_color(*GREEN)
    pdf.set_font("DejaVu", "B", 8)
    badge_w = pdf.get_string_width(badge) + 10
    pdf.rect(panel_x + 12, panel_y + 12, badge_w, 8, style="F")
    pdf.set_xy(panel_x + 12, panel_y + 13.5)
    pdf.cell(badge_w, 5, badge, align="C")

    pdf.set_text_color(*GREEN_DEEP)
    pdf.set_font("Serif", "B", 22)
    pdf.set_xy(panel_x + 12, panel_y + 26)
    pdf.multi_cell(panel_w - 24, 9, title)

    pdf.set_font("DejaVu", "", 10)
    pdf.set_text_color(*MUTED)
    pdf.set_xy(panel_x + 12, panel_y + 48)
    pdf.multi_cell(panel_w - 24, 5, subtitle)

    y = panel_y + 62
    for num, t, body in items:
        y = benefit_row(pdf, panel_x + 12, y, num, t, body, panel_w - 16)

    pdf.footer_bar("Польза овощей", page, light=True)


def main():
    pdf = Presentation()
    slide_1(pdf)
    slide_panel(
        pdf,
        "slide2.png",
        "ПОЧЕМУ ЭТО ВАЖНО",
        "Что дают овощи организму",
        "Ключевые эффекты при регулярном употреблении",
        [
            ("01", "Витамины и минералы", "A, C, K, фолат, калий и магний — база для обмена веществ и тонуса."),
            ("02", "Клетчатка для пищеварения", "Поддерживает сытость, работу кишечника и стабильную энергию."),
            ("03", "Антиоксидантная защита", "Помогают снижать воспаление и поддерживать иммунитет."),
            ("04", "Мало калорий — много пользы", "Удобны для баланса рациона без ощущения ограничений."),
        ],
        "02 / 03",
    )
    slide_panel(
        pdf,
        "slide3.png",
        "ПРАКТИКА",
        "Как есть овощи каждый день",
        "Простые шаги, которые легко удержать",
        [
            ("01", "Половина тарелки — овощи", "На обеде и ужине делайте овощи основой, а не гарниром «на сдачу»."),
            ("02", "Чередуйте цвета", "Зелёные, красные, оранжевые, фиолетовые — разный набор веществ."),
            ("03", "Готовьте по-разному", "Свежие, запечённые, на пару, в супах — так проще не надоесть."),
            ("04", "Держите готовый запас", "Нарезанные овощи и заготовки на 2–3 дня повышают шанс съесть норму."),
        ],
        "03 / 03",
    )
    pdf.output(str(OUT))
    ART.write_bytes(OUT.read_bytes())
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")
    print(f"Copied {ART}")


if __name__ == "__main__":
    main()
