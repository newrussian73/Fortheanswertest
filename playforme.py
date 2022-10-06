from selenium import webdriver
from selenium.webdriver.common.by import By
import unittest




#Авторизация в админ-панели
def auth(link):
    browser=webdriver.Chrome()
    browser.get(link)
    loginadmin=browser.find_element(By.XPATH, '//*[@id="Login"]')
    loginadmin.click()
    loginadmin.send_keys('vladislav.sharunov@simbirsoft.com')
    passwordadmin=browser.find_element(By.XPATH, '//*[@id="Password"]')
    passwordadmin.send_keys('Blokpost1976!')
    buttonlogin=browser.find_element(By.CSS_SELECTOR, "button.btn")
    buttonlogin.click()
    if browser.current_url != 'https://a.nc01.mptuz.crpt.tech/':

        passwordadmin=browser.find_element(By.XPATH, '//*[@id="Password"]')
        passwordadmin.send_keys('Blokpost1976!')
        buttonlogin=browser.find_element(By.CSS_SELECTOR, "button.btn")
        buttonlogin.click()
    url=browser.current_url
    return url
class testauth(unittest.TestCase):
    def testexpurl(self):
        self.assertEqual(auth('https://a.nc01.mptuz.crpt.tech/auth'),'https://a.nc01.mptuz.crpt.tech/','not auth')
if __name__=="__main__":
    unittest.main()