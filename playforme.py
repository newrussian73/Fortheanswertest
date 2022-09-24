from selenium import webdriver
from selenium.webdriver.common.by import By
import time


link="https://a.nc01.mptuz.crpt.tech/auth"

#Авторизация в админ-панели
try:
    browser=webdriver.Chrome()
    browser.get(link)
    loginadmin=browser.find_element(By.XPATH, '//*[@id="Login"]')
    loginadmin.click()
    loginadmin.send_keys('vladislav.sharunov@simbirsoft.com')
    passwordadmin=browser.find_element(By.XPATH, '//*[@id="Password"]')
    passwordadmin.send_keys('Blokpost1976!')
    buttonlogin=browser.find_element(By.CSS_SELECTOR, "button.btn")
    buttonlogin.click()
    time.sleep(5)
finally:
    browser.quit()