import customtkinter
import serial
import serial.tools.list_ports as serial_tools
from widgets import FlashMessage

class Application(customtkinter.CTk):
    def __init__(self, title):
        super().__init__()
        self.title(title)

        self.geometry("500x300")
        self.minsize(800, 300)

        # create 2x2 grid system
        self.grid_rowconfigure((0, 1), weight=1)
        self.grid_columnconfigure((0, 1, 2, 3), weight=1)

        self.flashmessage = FlashMessage(master=self, type="success")
        self.flashmessage.grid(row=0, column=0, columnspan=4,
                          ipadx=20, ipady=20, padx=20, pady=(20, 0), sticky="new")


        self.textbox = customtkinter.CTkTextbox(master=self)
        self.textbox.grid(row=1, column=0, columnspan=4,
                          padx=20, pady=(20, 0), sticky="nsew")

        self.menu = customtkinter.CTkOptionMenu(
            master=self, values=[comport.device for comport in serial_tools.comports()])
        self.menu.grid(row=2, column=0, padx=20, pady=20, sticky="ew")

        self.menu2 = customtkinter.CTkOptionMenu(
            master=self, values=[str(rate) for rate in list(serial.Serial.BAUDRATES) if rate >= 9600])
        self.menu2.grid(row=2, column=1, padx=20, pady=20, sticky="ew")

        self.connect_button = customtkinter.CTkButton(
            master=self, command=self.connect, text="Připojit")
        self.connect_button.grid(
            row=2, column=2, padx=20, pady=20, sticky="ew")

        self.disconnect_button = customtkinter.CTkButton(
            master=self, command=self.disconnect, text="Odpojit")
        self.disconnect_button.grid(
            row=2, column=3, padx=20, pady=20, sticky="ew")

    def connect(self):
        try:
            self.connection = serial.Serial(self.menu.get(), self.menu2.get())
            while True:
                self.update()
                if self.connection.isOpen() and self.connection.inWaiting():
                    self.textbox.insert(
                        "0.0", self.connection.readline().decode('utf'))
        except serial.SerialTimeoutException as e:
            print(e.strerror)
        except serial.PortNotOpenError as e:
            print(e.strerror)
        except serial.SerialException as e:
            print(e.strerror)


    def disconnect(self):
        try:
            self.connection.close()
        except serial.SerialException as e:
            print(e.strerror)
