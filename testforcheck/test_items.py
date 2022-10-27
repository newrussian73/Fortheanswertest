import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

link = 'http://selenium1py.pythonanywhere.com/catalogue/coders-at-work_207/'


class TestItems():
    def test_check_button(self, browser):
        browser.get(link)
        #time.sleep(30)
        find_button =bool(WebDriverWait(browser, 5).until (EC.presence_of_element_located((By.CLASS_NAME, 'btn.btn-lg.btn-primary.btn-add-to-basket'))))
        assert find_button == True,'test_items faliled'