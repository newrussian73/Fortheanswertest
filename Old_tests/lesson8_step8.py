import os
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

link='http://suninjuly.github.io/file_input.html'

try:
    browser=webdriver.Chrome()
    browser.get(link)
    input1=browser.find_element(By.NAME,'firstname')
    input1.send_keys('IVAN')
    input2=browser.find_element(By.NAME,'lastname')
    input2.send_keys('Ivanov')
    input3=browser.find_element(By.NAME,'email')
    input3.send_keys('qwpeigne')
    current_dir=os.path.abspath(os.path.dirname(__file__))
    file_path=os.path.join(current_dir, 'для вставки.txt')
    vstavka=browser.find_element(By.NAME,'file')
    vstavka.send_keys(file_path)
    button=browser.find_element(By.CSS_SELECTOR,'button.btn')
    button.click()

finally:
    time.sleep(5)
    browser.quit()