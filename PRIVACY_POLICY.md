# User Guide, Limitations, and GDPR Policy

This document describes the rules for using the "Sudoku" web application, its technical limitations, and the privacy policy in accordance with the EU General Data Protection Regulation (GDPR).

## 1. User Guide

- **Game Modes:** You can start playing instantly (via the "Start new game" button) in guest mode. To save your personal statistics, you must register or log in (using the "Login" / "Register" buttons in the top menu).
- **Settings:** Before starting a round, you can flexibly configure the game board: choose the difficulty level, specify the exact number of empty cells (from 36 to 54), and set a time limit in seconds.
- **Gameplay:** Fill the 9x9 grid with numbers following classic Sudoku rules. A timer is displayed during the game. You can clear the current round's inputs with the "Reset" button or end the game early to check your answers with the "Show result" button.
- **Results and Profile:** After finishing a round, a results window is displayed (showing your success percentage, number of correct answers, and time spent). Registered users can view their statistics in the "Profile" section.

## 2. Project Limitations

- **Purpose:** This project was developed as part of an educational process. It is not a commercial product.
- **Local Environment:** The project is provided as source code.
- **Disclaimer (As-Is):** The project is provided "as is". The developer does not guarantee uninterrupted operation on all devices and bears no responsibility for the loss of locally saved data.
- **GDPR Responsibility Upon Third-Party Deployment:** If any third party downloads this source code and deploys it on a public server, they automatically assume the legal role of a "Data Controller" under the GDPR. The original developer bears no responsibility for how such third parties collect, process, store, or (fail to) protect the personal data of end-users.

## 3. Privacy Policy (GDPR)

- **Data Protection by Default (Art. 25):** The core functionality of the game is fully accessible without registration (in guest mode). Registration is voluntary and required only for advanced features (saving statistics).
- **Data Minimization (Art. 5):** When creating an account, only the necessary basic set of data is collected (Name, Email, and a hashed password).
- **Consent and its Withdrawal (Art. 6, 7):** Consent to the processing of personal data is provided by the user through an affirmative action — clicking the "Register" button during registration (with prior notification). The "Profile" section features a "Delete My Account" button, allowing the user to withdraw this consent at any time and permanently delete their account and all data from the database.
- **Security (Art. 32):** Passwords are cryptographically hashed. Secure tokens are used to manage authorized sessions.
- **Data Transfer (Art. 45, 49):** The project does not contain hidden telemetry or trackers that would transfer personal data to third countries without the user's explicit consent.