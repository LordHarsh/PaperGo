import csv
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


def scrape_ieee_by_url(start_page=1, end_page=10, rows_per_page=100):
    """Scrape IEEE articles by directly accessing different page URLs using Selenium"""

    # Setup the WebDriver for Windows
    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")
    options.add_argument(
        "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    )

    driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install()), options=options
    )
    all_articles_data = []

    try:
        for page in range(start_page, end_page + 1):
            # Construct URL with page number
            url = f"https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=research%20papers&rowsPerPage={rows_per_page}&pageNumber={page}"
            print(f"Scraping page {page} at URL: {url}")

            # Navigate to the page
            driver.get(url)

            # Wait for the content to load
            time.sleep(5)

            # Wait for search results to appear
            WebDriverWait(driver, 20).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "xpl-results-item"))
            )

            # Find all article elements using Selenium
            articles = driver.find_elements(By.CSS_SELECTOR, "xpl-results-item")

            print(f"Found {len(articles)} articles on page {page}")

            for article in articles:
                try:
                    # Extract title using XPath
                    title_elem = None
                    try:
                        title_elem = article.find_element(By.XPATH, ".//h3/a")
                    except:
                        try:
                            title_elem = article.find_element(By.XPATH, ".//h3[@class='result-item-title']/a")
                        except:
                            pass
                    
                    title = title_elem.text.strip() if title_elem else 'N/A'
                    
                    # Extract authors - modified to match the actual structure
                    authors_elem = None
                    try:
                        # Target the xpl-authors-name-list element
                        authors_elem = article.find_element(By.XPATH, ".//xpl-authors-name-list/p")
                    except:
                        try:
                            authors_elem = article.find_element(By.CSS_SELECTOR, ".author")
                        except:
                            pass
                    
                    authors = authors_elem.text.strip().replace('\n', ' ') if authors_elem else 'N/A'
                    
                    # Extract abstract using XPath
                    abstract_elem = None
                    try:
                        abstract_elem = article.find_element(By.XPATH, ".//div[@class='twist-container']/span")
                    except:
                        try:
                            # Fallback to any span that might contain the abstract
                            abstract_elem = article.find_element(By.XPATH, ".//div[contains(@class, 'twist-container')]/span")
                        except:
                            pass
                    
                    abstract = abstract_elem.text.strip().replace('\n', ' ') if abstract_elem else 'N/A'
                    
                    # Extract publication date using XPath
                    date_elem = None
                    try:
                        date_elem = article.find_element(By.XPATH, ".//div[@class='publisher-info-container']/span[1]")
                    except:
                        try:
                            # Try other date selectors
                            date_elem = article.find_element(By.XPATH, ".//span[contains(text(), 'Year:')]")
                        except:
                            pass
                    
                    date = date_elem.text.strip() if date_elem else 'N/A'
                    
                    all_articles_data.append([title, authors, abstract, date])
                    print(f"Scraped: {title}")
                except Exception as e:
                    print(f"Error scraping article: {str(e)}")
                    continue

        # Write all data to CSV
        with open("papers_ieee.csv", "w", newline="", encoding="utf-8") as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(["Title", "Authors", "Abstract", "Publication Date"])
            writer.writerows(all_articles_data)

        print(f"Total articles scraped: {len(all_articles_data)}")

    except Exception as e:
        print(f"Error during scraping: {e}")
    finally:
        driver.quit()


if __name__ == "__main__":
    # Start from page 1, go to page 10, with 100 results per page
    scrape_ieee_by_url(start_page=1, end_page=1, rows_per_page=20)
