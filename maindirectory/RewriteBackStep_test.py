import time
from selenium import webdriver
from selenium.webdriver.common.by import By
import unittest


def fill_form(link):
    browser = webdriver.Chrome()
    browser.get(link)
    input1 = browser.find_element(By.XPATH, '//input[@placeholder="Input your first name"]')
    input1.send_keys("test")
    input2 = browser.find_element(By.XPATH, '//input[@placeholder="Input your last name"]')
    input2.send_keys("test")
    input3 = browser.find_element(By.XPATH, '//input[@placeholder="Input your email"]')
    input3.send_keys("test")
    button = browser.find_element(By.CSS_SELECTOR, "button.btn")
    button.click()
    time.sleep(2)
    welcome_text_elt = browser.find_element(By.TAG_NAME, "h1")
    browser.quit()
    return welcome_text_elt.text


class TestRun(unittest.TestCase):
    def test_Reg1(self):
        self.assertEqual(fill_form(
            "http://suninjuly.github.io/registration1.html") == "Congratulations! You have successfully registered!", "test failed")

    def test_Reg2(self):
        self.assertEqual(fill_form(
            "http://suninjuly.github.io/registration2.html") == "Congratulations! You have successfully registered!", 'test failed')


if __name__ == '__main__':
    unittest.main()
