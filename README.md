### **Project Overview: Lead Generation Automation**

This project automates the lead generation process by scraping and enriching data, and then pushing updates to a Telegram bot for real-time notifications. It also includes a dashboard to monitor the progress of the scraping and enrichment processes.

---

### **Use Case**

The **Lead Generation Automation** system is designed to scrape leads from various sources, enrich them with additional data (such as contact details, company info, etc.), and then push real-time progress updates to a **Telegram bot**. The project has two primary functionalities:
1. **Scraping Data**: Automatically gathering potential leads from a predefined data source.
2. **Enriching Data**: Enhancing the scraped data by adding more information to make it actionable.

In addition to these, the project features a **real-time dashboard** that provides insight into the current progress of the scraping and enrichment processes, allowing for error simulations and status tracking.

---

### **Flow**

1. **Scraping Phase**:
   - The system starts scraping data from the specified lead source.
   - The scraper runs periodically or on demand, depending on the configuration.
   - Each lead is collected, stored, and passed for enrichment.

2. **Enriching Phase**:
   - The scraped data is then processed and enriched with additional details like contact info, company data, etc.
   - Once enriched, the data is ready for further action (e.g., sales outreach).

3. **Telegram Bot Notifications**:
   - A Telegram bot sends updates during each phase (scraping, enriching) to a designated chat.
   - This provides real-time notifications of the system's progress and errors.

4. **Progress Metrics and Dashboard**:
   - The system tracks important metrics, such as total leads scraped, total leads enriched, and any errors encountered.
   - A **real-time dashboard** hosted on `localhost` provides an easy-to-read view of these metrics.

---

### **How to Set Up**

#### 1. **Prerequisites**

- **Node.js** (Version 16 or above)
- **npm** (Node Package Manager)
- **Git** for version control
- **Telegram Bot Token**: You need to create a Telegram bot via BotFather and get the bot token.
- **MongoDB**: A database to store the lead data (ensure MongoDB is running locally or using a cloud instance).
- **.env** File for storing sensitive information like bot token, chat ID, database credentials, etc.

---

#### 2. **Installation**

Follow these steps to get the project up and running:

1. **Clone the Repository**:
   Clone the repository to your local machine:
   ```bash
   git clone https://github.com/Madan2468/Lead-Generation-API.git
   cd Lead-Generation-API
   ```

2. **Install Dependencies**:
   Navigate to the project directory and run:
   ```bash
   npm install
   ```

3. **Set Up `.env` File**:
   In the root directory, create a `.env` file with the following variables (you can get values for `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` from the Telegram Bot API):
   ```
   TELEGRAM_BOT_TOKEN=<your-telegram-bot-token>
   TELEGRAM_CHAT_ID=<your-telegram-chat-id>
   MONGO_URI=<your-mongodb-uri>
   DASHBOARD_PORT=3000
   ```

4. **Start the Application**:
   Run the following command to start the server:
   ```bash
   npm start
   ```

   This will start the data scraping, enrichment process, and the dashboard at `http://localhost:3000`.

---

### **Important Features**

1. **Data Scraping**:
   - Scrapes data from a predefined source (like a website or database).
   - The scraping process is logged and shown in the Telegram bot.

2. **Data Enrichment**:
   - Enhances the data by adding additional information.
   - This makes the scraped leads more actionable for business processes like outreach.

3. **Telegram Integration**:
   - Sends real-time progress updates about scraping and enrichment through a Telegram bot.
   - Alerts for errors and progress are sent to the designated Telegram channel.

4. **Real-Time Dashboard**:
   - Hosted on `localhost:3000`, it shows progress in real-time, such as:
     - Total leads scraped
     - Total leads enriched
     - Errors encountered
   - Includes error simulation for testing purposes.

5. **Error Handling**:
   - The bot and the dashboard both track errors during the scraping or enrichment phase.
   - Users can simulate errors for testing by making POST requests to `/simulate-error`.

---

### **Testing the Project**

To test the project:
1. **Start the Server** by running `npm start`.
2. **Check the Telegram Bot**:
   - If the bot token and chat ID are correctly configured, you should start receiving progress updates in your Telegram chat.
   - You can simulate errors by making POST requests to `/simulate-error`.

3. **Dashboard**:
   - Visit `http://localhost:3000` to view the current progress of the scraping and enrichment process.
   - The dashboard will show a summary of metrics such as the number of leads scraped, enriched, and any errors.

---

### **Git Workflow**

Here’s how to manage your code with Git:
1. **Clone the Repository**: 
   If you haven't already cloned the repository, do so with:
   ```bash
   git clone https://github.com/Madan2468/Lead-Generation-API.git
   ```

2. **Create a New Branch**:
   Before making changes, always create a new branch:
   ```bash
   git checkout -b <branch-name>
   ```

3. **Make Changes**:
   Make any required changes to the codebase.

4. **Commit Changes**:
   After making changes, commit them:
   ```bash
   git add .
   git commit -m "Description of the changes made"
   ```

5. **Push the Branch**:
   Push your changes to the remote repository:
   ```bash
   git push origin <branch-name>
   ```

6. **Merge the Branch**:
   Once your changes are reviewed and ready, merge the branch into `main`:
   ```bash
   git checkout main
   git merge <branch-name>
   git push origin main
   ```

---

### **Handling Sensitive Data (.env)**

1. **Add `.env` to `.gitignore`**:
   Ensure that `.env` is added to `.gitignore` to avoid committing sensitive data to the repository:
   ```
   .env
   ```

2. **Remove `.env` from Git History**:
   If you accidentally push `.env` to Git, remove it using the following:
   - Run `git rm --cached .env`
   - Commit and push the changes to Git.

---

### **Conclusion**

This project automates the process of scraping and enriching leads while providing real-time updates via a Telegram bot and an intuitive dashboard. By following the setup instructions and using Git for version control, you can easily deploy, test, and maintain this system for lead generation.

