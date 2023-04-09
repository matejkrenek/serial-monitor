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
  <li>
    <a href="#about-the-toolchain">About The Toolchain</a>
  </li>
  <li>
    <a href="#getting-started">Getting Started</a>
    <ul>
      <li><a href="#prerequisites">Prerequisites</a></li>
      <li><a href="#installation">Installation</a></li>
    </ul>
  </li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#limitations">Limitations</a></li>
  <li><a href="#contact">Contact</a></li>
  <li><a href="#acknowledgments">Acknowledgments</a></li>



<!-- ABOUT THE TOOLCHAIN -->
## About The Toolchain

This toolchain is based on compilation with SDCC and programming the controller with STVP. This allows you to use all the features of C99 standard and use any programmer that is supported by STVP.

In addition to this, unused functions are removed during compilation with the use of sdccrm.

<!-- GETTING STARTED -->
## Getting Started

Follow all the steps below for desired functionality of the toolchain.

Disclaimer: the steps are described for windows because i suppose linux users are much smarter than windows users so they don't need to be guided XD

### Prerequisites

Before running the toolchain on your machine, some necessary tools need to be downloaded.

You may have some of these tools already downloaded.

#### Nodejs
- Toolchain uses nodejs to handle more complex tasks (parsing json config, calculating the size of files, adjusting SPL library)
- Download (download the LTS version): [nodejs.org](https://nodejs.org/en/)
#### STVP
- Programmer to flash the program to stm
- STVP comes with STVD that is distributed by STM. You can download STVD and STVP [here](https://my.st.com/content/my_st_com/en/products/development-tools/software-development-tools/stm8-software-development-tools/stm8-ides/stvd-stm8.license=1601176827357.product=STVD-STM8.version=42.0.0.html)
#### SDCC
- Compiler to compile the program
- Download: [sdcc.sourceforge.net](https://sdcc.sourceforge.net/)
#### Others
   ```sh
   choco install git make vscode mingw
   ```
### Installation

Now when all necessary tools are downloaded you can run the toolchain on your machine. 

1. Clone the repo

   ```sh
   git clone https://github.com/matejkrenek/stm8-toolchain.git {project_name}
   ```
2. Edit config.json according to you needs

   ```json
   {
      "device": "STM8S103",
      "flash": {
          "stvp_path": "C:/Program Files (x86)/STMicroelectronics/st_toolset/stvp/",
          "stlink": "ST-LINK",
          "device": "STM8S103F3"
      }
   }
   ```
   #### Supported parameters
    | Property        | Values                            |
    | --------------- | --------------------------------- |
    | "device"        | STM8S103, STM8S105, STM8S208      |
    | "flash.stlink"  | Any programmer supported by STVP  |
    | "flash.device"  | Any device supported by STVP      |
    
3. After editing config.json 

   ```sh
   make update
   ```

<!-- USAGE EXAMPLES -->
## Usage
- After any adjustment of config.js run:

   ```sh
   make update
   ```
   or
   
   ```sh
   make install
   ```
- For libraries there is associated folder lib:

   ```sh
   |--app
      |--inc
      |--src
   |--lib
      |--SPL
        |--inc
        |--src
      |--Your-Library
        |--inc
        |--src
   ```
### Commands
- make commands that you can use to trigger functions

   ```sh
   make {command}
   ```
  | Command         | Functionality                                                               |
  | --------------- | --------------------------------------------------------------------------- |
  | "install"       | It installs desired version of SPL library based on your configuration      |
  | "update"        | Same as the install command                                                 |
  | "clean"         | Removes build directory                                                     |
  | "compile"       | Compiles the program                                                        |
  | "flash"         | Uploads the program to stm                                                  |
  | "run"           | Runs clean, compile, flash commands                                         |

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
- [electron-vite-react](https://github.com/matejkrenek/electron-vite-react)

<p align="right">(<a href="#readme-top">Back to top</a>)</p>
