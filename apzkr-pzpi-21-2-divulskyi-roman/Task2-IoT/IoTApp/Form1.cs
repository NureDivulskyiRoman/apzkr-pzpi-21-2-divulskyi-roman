using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Text.Json;
using IoTApp;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;

namespace IoTApp
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void label4_Click(object sender, EventArgs e)
        {

        }

        private void label5_Click(object sender, EventArgs e)
        {

        }

        private void label1_Click_1(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            var temperature = numericUpDown1.Value;
            var dateTime = dateTimePicker1.Value;
            var humidity = numericUpDown2.Value;
            var rainfall = numericUpDown3.Value;
            var location = textBox1.Text;

            var weatherCondition = new WeatherCondition()
            {
                Temperature = Convert.ToDouble(temperature),
                DateTime = dateTime,
                Humidity = Convert.ToDouble(humidity),
                Location = location,
                Rainfall = Convert.ToDouble(rainfall),
            };

            using (var client = new HttpClient())
            {
                string url = "https://localhost:5001/api/WeatherConditions";
                var json = JsonSerializer.Serialize(weatherCondition);

                var content = new StringContent(json, Encoding.UTF8, "application/json");

                try
                {
                    var response = client.PostAsync(url, content).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Success");
                    }
                    else
                    {
                        MessageBox.Show("Error. Code: " + response.StatusCode);
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Error. Message: " + ex.Message);
                }
            }
        }

        private void dateTimePicker1_ValueChanged(object sender, EventArgs e)
        {

        }
    }
}