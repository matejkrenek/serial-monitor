import customtkinter
import tkinter

class FlashMessage(customtkinter.CTkFrame):
    def __init__(self, master, type = "default", *args, **kwargs):
        super().__init__(master, height=60, fg_color='#adb5bd', *args, **kwargs)


        self.icon = customtkinter.CTkLabel(self, text="i", text_color="#000000")
        self.icon.pack(anchor=tkinter.W)

        self.label = customtkinter.CTkLabel(self, text="Nemáš oprávnění pro přistoupení k /dev/tty1", text_color="#000000")
        self.label.pack(anchor=tkinter.CENTER)


        self.button = customtkinter.CTkLabel(self, text="x", text_color="#000000")
        self.button.pack(anchor=tkinter.E)