#include <WiFi.h>

const char* ssid = "NETGEAR11";
const char* password = "modernfinch222";

WiFiServer server(80);

String header;

// This is the representation of the binary for outputtin to Arduino
int BINARY[8] = {LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW};

// These are the colours chosen
int red = 0;
int blue = 255;
int green = 255;
int brightness = 200;

int myPin = 0;

// These are the pins that will be used for outputting the binary
int PINS[8] = {32, 33, 25, 26, 27, 14, 12, 13};

// These are the pins for the R, G, B colours
#define RED_PIN 19
#define GREEN_PIN 21
#define BLUE_PIN 18
#define BRIGHTNESS_PIN 5

// This is the pin for the Arduino success notification
#define successPin 35

int counter = 1;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  for(int i = 0; i < 8; i++){
    pinMode (PINS[i], OUTPUT);
  }

  
  pinMode (RED_PIN, OUTPUT);
  pinMode (GREEN_PIN, OUTPUT);
  pinMode (BLUE_PIN, OUTPUT);
  pinMode (BRIGHTNESS_PIN, OUTPUT);
  
  pinMode (successPin, INPUT);

  // Connecting to WiFi
  Serial.println("Connecting");

  WiFi.begin(ssid,  password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");

  Serial.println("Connected");
  Serial.println("IP address:");
  Serial.print(WiFi.localIP());
  Serial.println("");

  server.begin();
}

void loop() {

  WiFiClient client = server.available();

  if (client) {
    Serial.println("New client");
    String currentLine = "";
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        Serial.write(c);
        header += c;
        if (c == '\n') {
          if (currentLine.length() == 0) {
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println("Access-Control-Allow-Origin: *");
            client.println("Connection: close");
            client.println();

            client.print("success");
              

            getColours(client);

            sendLightingColour(1);
            sendLightingColour(2);
            sendLightingColour(3);
            sendLightingColour(4);
          
            break;
          } else {
            currentLine = "";
          }
        } else if (c != '\r') {
          currentLine += c;
        }
      }
    }

    header = "";
    client.stop();
    Serial.println("Client disconnected");
    Serial.println("");
  }
}
  
void sendLightingColour(int counter) {
  if(counter == 1) {
    convertToBinary(red);
    myPin = RED_PIN;
  } else if (counter == 2) {
    convertToBinary(green);
    myPin = GREEN_PIN;
  } else if (counter == 3) {
    convertToBinary(blue);
    myPin = BLUE_PIN;
  } else if (counter == 4) {
    convertToBinary(brightness);
    myPin = BRIGHTNESS_PIN;
  }

  // Sends the appropriate data for the colour
  // After setting all pins will set the colour pin - R, G or B
  // This colour pin is set after so arduino can wait on it to be set and then read all pins to get the binary number for the colour
  Serial.println("Sending data");
  sendData(myPin);


  // Arduino will alert me that it has finished with my output
  // I need to wait until it has finished
  int value = 0;
  do {
    delay(5);
    value = digitalRead(successPin);
    Serial.println(value);
  } while(value == 0);

  // Once arduino has finished I need to turn off my pin so that the Arduino doesn't get too enthusiastic and do it again
  digitalWrite(myPin, LOW);
  
  counter++;
}

void sendData(int pin) {
  digitalWrite(RED_PIN, LOW);
  digitalWrite(GREEN_PIN, LOW);
  digitalWrite(BLUE_PIN, LOW);
  digitalWrite(BRIGHTNESS_PIN, LOW);
  
  Serial.println("Pins:");
  for(int i = 0; i < 8; i++){
    digitalWrite(PINS[i], BINARY[i]);
    Serial.println(PINS[i]);
    Serial.println(BINARY[i]);
  }

  digitalWrite(pin, HIGH);
}


void convertToBinary(int number) {
  Serial.println("Decimal:");
  Serial.println(number);
  Serial.println("Binary:");
  for (int x = 7; x >= 0; x--) {
    
    if(number-pow(2, x) >= 0) {
      BINARY[7-x] = HIGH;
      number -= pow(2, x);
    } else {
      BINARY[7-x] = LOW;
    }
    Serial.println(BINARY[7-x]);
  }
}

void getColours(WiFiClient client) {
  String colours = "";
  while (client.available() > 0) {
    char c = client.read();
    colours += c;
  }

  String colourChoice = "";
  for(int x = 0; x < 4; x++) {
    if (x == 0) {
      red = getColourValue(colours, "red=");
    } else if (x == 1) {
      green = getColourValue(colours, "green=");
    } else if (x == 2) {
      blue = getColourValue(colours, "blue=");
    } else {
      brightness = getColourValue(colours, "brightness=");
    }
  }

  Serial.println(red);
  Serial.println(green);
  Serial.println(blue);
  Serial.println(brightness);
}

int getColourValue(String colours, String colourChoice) {
  int colourPosition = (colours.indexOf(colourChoice)+colourChoice.length());
  int colourValue = colours.substring(colourPosition, colourPosition+3).toInt();
  return colourValue;
}
