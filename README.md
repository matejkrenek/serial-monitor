<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<a href="https://github.com/matejkrenek/serial-monitor">
  <p align="center">
    <img src="https://github.com/matejkrenek/serial-monitor/blob/1.0.0/public/logo.svg" width="128" />
  </p>
</a>
<div align="center">
  <h2 align="center">Serial monitor</h2>

  <p align="center">
    Easy to use serial monitor with fancy features like writing data into charts or tables
    <br />
    <a href="https://github.com/matejkrenek/stm8-toolchain/issues">Report Bug</a>
    ·
    <a href="https://github.com/matejkrenek/stm8-toolchain/issues">Request Feature</a>
    ·
    <a href="https://github.com/matejkrenek/serial-monitor/releases/download/1.0.0/Serial.monitor-Windows-1.0.0-Setup.exe">Download</a>
  </p>
</div>

<br/>

<!-- TABLE OF CONTENTS -->
### Table of contents
  <li><a href="#application-preview">Application Preview</a></li>
  <li><a href="#tech-stack">Tech Stack</a></li>
  <li>
    <a href="#usage">Usage</a>
    <ul>
      <li><a href="#for-spl-library-of-stm">For SPL library of STM</a></li>
    </ul>
  </li>
  <li><a href="#limitations">Limitations</a></li>
  <li><a href="#contact">Contact</a></li>
  <li><a href="#acknowledgments">Acknowledgments</a></li>


<!-- APPLICATION PREVIEW -->
## Application Preview

<!-- TECH STACK -->
## Tech Stack
Application is built with <strong>electron-react-typescript-tailwindcss</strong> stack.
- Electron (for building desktop apps): [more about](https://www.electronjs.org)
- React (for building UI): [more about](https://react.dev)
- Typescript (for typed javascript): [more about](https://www.typescriptlang.org)
- Tailwindcss (for styleing the UI): [more about](https://tailwindcss.com)

<!-- USAGE -->
## Usage
### For SPL library of STM

<!-- CONTACT -->
## Contact

Matěj Křenek - [mate23.krenek@gmail.com](mailto:mate23.krenek@gmail.com)

Project Link: [https://github.com/matejkrenek/serial-monitor](https://github.com/matejkrenek/serial-monitor)

<!-- LIMITATIONS -->
## Limitations

Sometimes, when you write several messages in a row to the serial monitor, they may overlap and thus the serial monitor will evaluate them poorly, especially in the case of sending commands. Because of this, it is necessary to pay attention to a sufficient time delay between writing to the serial monitor.

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

The idea of the serial monitor with tabs and partially the appearance of the application was stolen from this repo:
- [Electron-Serial-Port-Monitor](https://github.com/itterheim/Electron-Serial-Port-Monitor)

I was struggling with proper implementation of react-electron-typescript stack and publishing the application. This github repo helped a lot in this area:
- [electron-vite-react](https://github.com/electron-vite/electron-vite-react)

<p align="right">(<a href="#readme-top">Back to top</a>)</p>
