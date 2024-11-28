# Logix UI Components Library

<p align="left"><a href="https://logi-x.org" target="_blank"><img width="15%" src="https://i.ibb.co/BBNVxyH/logo-full-light-256.png" alt="logi-x" /></a></p>

## Intro

The **Logix UI** is a ReactJS library for creating documentation for components and libraries. It provides a flexible and easy-to-use interface for documenting your components, ensuring consistency and readability.

## Usage

```jsx
import React from "react";
import {QR} from "@logi-x/experts";

const App = () => {
  return (
    <QR
      type="svg"
      width={256}
      height={256}
      margin={0}
      href="https://logix.gobeyound.com?v0.0.2"
      dotsType="classy"
      cornerDotType="dot"
      cornerSquareType="extra-rounded"
      dotsColor="#000000"
      cornerDotColor="#000000"
      cornerSquareColor="#000000"
      logo="https://experts.gobeyound.com/storage/logos/png/logo_small_app_1024.png"
      logoEnabled
      logoMargin={-60}
      download={false}
      fileName="qr"
      fileExtension="svg"
    />
  );
};

export default App;
```

---

## Installation

### For Developers

Follow these steps to set up the project locally:

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20+)
- [React](https://react.dev/) (for frontend applications)
- [TypeScript](https://www.typescriptlang.org/)

### Library Setup

Since it's a private repository, you'll need to clone it manually. If you have access to the repository, you can use the following command:

1. Clone the repository:

   ```bash
   git clone https://github.com/logi-x/experts
   cd experts
   ```

2. Install npm dependencies with yarn or npm: (yarn recommended)

   ```bash
   yarn install
   ```

3. Start the development servers:

   ```bash
   yarn experts:docs
   ```

---

## Technologies Used

- **Docs**:
  - ReactJS (for testing React components)

---

## Contributing

We welcome contributions to improve **Logix**! To contribute:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Create a new Pull Request.

---

## Security Vulnerabilities

If you discover a security vulnerability within Experts Android, iOS or website, please send an e-mail to Ahmed Sulaimani via [ahmed.sulaimani@hotmail.com](mailto:ahmed.sulaimani@hotmail.com). All security vulnerabilities will be promptly addressed.

## License

Experts App is a proprietary software application developed and owned by **Logix Inc<sup><sub>©</sub></sup>**. This software is licensed, not sold, and its use is subject to the terms and conditions outlined in this license agreement.
. By installing, accessing, or using Experts App, you agree to comply with the following terms:

1- License Grant: **Logix Inc<sup><sub>©</sub></sup>** grants you a non-exclusive, non-transferable, and limited license to use Experts App solely for personal or internal business purposes. You are not permitted to modify, distribute, sublicense, or resell the software or any portion of it.

2- Restrictions: You may not reverse engineer, decompile, or disassemble Experts App or attempt to derive the source code. Unauthorized reproduction, duplication, distribution, or use of the software outside the terms of this license is strictly prohibited.

3- Updates and Support: **Logix Inc<sup><sub>©</sub></sup>** may, at its discretion, provide updates, enhancements, or support for Experts App. This license does not guarantee access to future versions or support services unless explicitly stated in a separate agreement.

4- Intellectual Property: All rights, title, and interest in Experts App, including any intellectual property rights, remain the sole property of **Logix Inc<sup><sub>©</sub></sup>**. This license does not grant you any rights to trademarks, service marks, or logos associated with Experts App.

5- Termination: This license is effective until terminated. Your rights under this license will terminate automatically without notice if you fail to comply with any of its terms. Upon termination, you must cease all use of Experts App and destroy all copies in your possession.

6- Disclaimer of Warranty: Experts App is provided "as is" without warranty of any kind, either express or implied. **Logix Inc<sup><sub>©</sub></sup>** does not warrant that the software will be error-free or uninterrupted.

7- Limitation of Liability: In no event shall **Logix Inc<sup><sub>©</sub></sup>** be liable for any damages arising out of the use or inability to use Experts App, including but not limited to lost profits, business interruption, or loss of data.

By using Experts App, you acknowledge that you have read, understood, and agreed to be bound by the terms of this license agreement. If you do not agree to these terms, you must not install, use, or access Experts App.

---

## Contact

For questions or support, please reach out to us at [ahmed.sulaimani@hotmail.com](mailto:ahmed.sulaimani@hotmail.com).
