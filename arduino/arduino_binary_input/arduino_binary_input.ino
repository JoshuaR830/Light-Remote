#include <FastLED.h>

#define NUM_LEDS 120
#define DATA_PIN 5

int pins[8] = {6, 7, 8, 9, 10, 11, 12, 13};
int binary[8] = {0, 0, 0, 0, 0, 0, 0, 0};
int successPin = 52;

int red = 256;
int green = 256;
int blue = 256;
int brightness = 256;

int RED_PIN = 3;
int BLUE_PIN = 4;
int GREEN_PIN = 2;
int BRIGHTNESS_PIN = 22;

int counter = 4;

CRGB leds[NUM_LEDS];

void setup() {
  Serial.begin(9600);
  pinMode(successPin, OUTPUT);

  for(int i = 0; i < 8; i++) {
    pinMode(pins[i], INPUT);
  }
  
  pinMode(RED_PIN, INPUT);
  pinMode(GREEN_PIN, INPUT);
  pinMode(BLUE_PIN, INPUT);
  pinMode(BRIGHTNESS_PIN, INPUT);
  
  FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);
  
}

void loop() {
  // put your main code here, to run repeatedly:
  int colourMode = getColourMode();

  if(colourMode > 0) {
    getBinary();
  }

  int decimal = convertToDecimal();

  
  if (colourMode == 1) {
    red = decimal;
    Serial.println("Red:");
    Serial.println(red);
  }

  if (colourMode == 2) {
    green = decimal;
    Serial.println("Green::");
    Serial.println(green);
  }

  if (colourMode == 3) {
    blue = decimal;
    Serial.println("Blue:");
    Serial.println(blue);
  }

  if (colourMode == 4) {
    brightness = decimal;
    Serial.println("brightness:");
    Serial.println(brightness);
  }

  counter++;

  digitalWrite(successPin, HIGH);
  Serial.println("Success");
  delay(10);
  digitalWrite(successPin, LOW);
  
  if (red != 256 && green != 256 && blue != 256 && brightness != 256){
    Serial.println("Let there be light");
    lighting();
  }

}

void getBinary() {
  Serial.println("Binary:");
  for (int i = 0; i < 8; i++) {
    if(digitalRead(pins[i]) > 0) {
      binary[i] = 1;
    } else {
      binary[i] = 0;
    }
    Serial.println(digitalRead(pins[i]));
  }
}

// If any of the colour pins are on - then end the loop
int getColourMode() {
  int colourMode = 0;
  do {
    delay(100);
    
    int r_pin = digitalRead(RED_PIN);
    int b_pin = digitalRead(BLUE_PIN);
    int g_pin = digitalRead(GREEN_PIN);
    int brightness_pin = digitalRead(BRIGHTNESS_PIN);


    if (r_pin > 0) {
      colourMode = 1;
    } else if (g_pin > 0) {
      colourMode = 2;
    } else if (b_pin > 0) {
      colourMode = 3;
    } else if (brightness_pin > 0) {
      colourMode = 4;
    }
      
  } while(colourMode == 0);

  return colourMode;
}

int convertToDecimal() {
  Serial.println("Decimal:");
  int total = 0;
  for(int i = 0; i < 8; i++) {
    total += binary[i] * 1<<i;
    Serial.println(total);
  }
  Serial.println(total);
  return total;
}


void lighting() {
  for(int i = 0; i < NUM_LEDS; i++) {
    leds[i].r = red;
    leds[i].b = blue;
    leds[i].g = green;
  }

  FastLED.setBrightness(brightness);
  FastLED.show();
  red = 256;
  green = 256;
  blue = 256;
  brightness=256;
}
