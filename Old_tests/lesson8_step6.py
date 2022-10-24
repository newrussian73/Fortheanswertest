from selenium import webdriver
from selenium.webdriver.common.by import By
import math
import time

def calc(x):
    return str(math.log(abs(12*math.sin(int(x)))))

link='http://suninjuly.github.io/execute_script.html'


try:
    browser=webdriver.Chrome()
    browser.get(link)
    num=browser.find_element(By.ID,'input_value')
    number=num.text
    x=calc(number)
    input1=browser.find_element(By.ID,'answer')
    browser.execute_script('return arguments[0].scrollIntoView(true)',input1)
    input1.send_keys(x)
    checkbox=browser.find_element(By.ID,'robotCheckbox')
    checkbox.click()
    radiobutton=browser.find_element(By.ID,'robotsRule')
    radiobutton.click()
    button=browser.find_element(By.CSS_SELECTOR,'button.btn')
    button.click()
finally:
    time.sleep(5)
    browser.quit()

