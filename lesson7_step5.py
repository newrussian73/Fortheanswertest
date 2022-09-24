from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import math

def calc(x):
    return str(math.log(abs(12*math.sin(int(x)))))

link ='https://suninjuly.github.io/math.html'

try:
    browser=webdriver.Chrome()
    browser.get(link)
    x_element=browser.find_element(By.ID,'input_value')
    x=x_element.text
    y=calc(x)
    input1=browser.find_element(By.ID,'answer')
    input1.send_keys(y)
    checkbox=browser.find_element(By.ID,'robotCheckbox')
    checkbox.click()
    radiobutton=browser.find_element(By.ID,'robotsRule')
    radiobutton.click()
    button=browser.find_element(By.CSS_SELECTOR,'button.btn')
    button.click()
finally:
    time.sleep(5)
    browser.quit()

