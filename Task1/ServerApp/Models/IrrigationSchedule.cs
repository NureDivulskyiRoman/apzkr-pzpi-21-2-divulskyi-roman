using System;

namespace ServerApp.Models
{
    // Розклад зрошення
    public class IrrigationSchedule
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int Frequency { get; set; } // у годинах
        public int IrrigationDeviceId { get; set; }
        public IrrigationDevice IrrigationDevice { get; set; }
    }
}
