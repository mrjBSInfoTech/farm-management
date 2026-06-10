#include <WiFi.h>
#include <HTTPClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// ================= WIFI =================
const char* ssid = ""; // Enter your WiFi SSID
const char* password = ""; // Enter your WiFi password

const char* serverURL = "http://192.168.1.3:5000/api/iot/data";

// ================= SENSOR PINS =================
#define PH_SENSOR_PIN 34
#define TURBIDITY_PIN 35
#define ONE_WIRE_BUS 4

// ================= ESP32 ADC =================
#define VREF 3.3
#define ADC_RESOLUTION 4095.0

// ================= pH Calibration =================
float slope = 3.5;
float offset = 0.0;

// ================= TEMPERATURE =================
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature tempSensor(&oneWire);

void setup() {
  Serial.begin(115200);

  // Start temperature sensor
  tempSensor.begin();

  // Connect WiFi
  WiFi.begin(ssid, password);

  Serial.print("Connecting to WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi Connected!");
  Serial.print("ESP32 IP: ");
  Serial.println(WiFi.localIP());
}

void loop() {

  // ================= READ pH =================
  float phVoltage = readPHVoltage();
  float pHValue = (slope * phVoltage) + offset;

  // ================= READ TEMPERATURE =================
  tempSensor.requestTemperatures();

  float tempC = tempSensor.getTempCByIndex(0);
  float tempF = tempSensor.getTempFByIndex(0);

  // ================= READ TURBIDITY =================
  int turbidityADC = analogRead(TURBIDITY_PIN);

  float turbidityVoltage =
      turbidityADC * (VREF / ADC_RESOLUTION);

  // ================= SERIAL MONITOR =================
  Serial.println("========== SENSOR DATA ==========");

  Serial.print("pH Value: ");
  Serial.println(pHValue, 2);

  Serial.print("Temperature C: ");
  Serial.println(tempC, 2);

  Serial.print("Temperature F: ");
  Serial.println(tempF, 2);

  Serial.print("Turbidity ADC: ");
  Serial.println(turbidityADC);

  Serial.print("Turbidity Voltage: ");
  Serial.println(turbidityVoltage, 3);

  // ================= SEND TO API =================
  if (WiFi.status() == WL_CONNECTED) {

    HTTPClient http;

    http.begin(serverURL);

    http.addHeader("Content-Type", "application/json");

    String json = "{";
    json += "\"ph\":" + String(pHValue, 2) + ",";
    json += "\"temperature\":" + String(tempC, 2) + ",";
    json += "\"turbidity\":" + String(turbidityVoltage, 3) + ",";
    json += "\"oxygen\":0";
    json += "}";

    Serial.println("Sending to API...");
    Serial.println(json);

    int httpResponseCode = http.POST(json);

    Serial.print("HTTP Response: ");
    Serial.println(httpResponseCode);

    http.end();

  } else {
    Serial.println("WiFi Disconnected!");
  }

  delay(2500);
}

// ================= FUNCTION: STABLE pH READING =================
float readPHVoltage() {

  const int samples = 10;

  int total = 0;

  for (int i = 0; i < samples; i++) {

    total += analogRead(PH_SENSOR_PIN);

    delay(10);
  }

  float averageADC = total / (float)samples;

  return averageADC * (VREF / ADC_RESOLUTION);
}