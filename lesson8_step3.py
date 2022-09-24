from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
import time

link='http://suninjuly.github.io/selects1.html'
try:
    browser=webdriver.Chrome()
    browser.get(link)

    num1=browser.find_element(By.ID,'num1')
    num1=int(num1.text)
    num2=browser.find_element(By.ID,'num2')
    num2=int(num2.text)
    sum=str(num1+num2)
    select=Select(browser.find_element(By.ID,'dropdown'))
    select.select_by_value(sum)
    button=browser.find_element(By.CSS_SELECTOR,'[type="submit"]')
    button.click()
finally:
    time.sleep(5)
    browser.quit()

