namespace ServerApp.Models
{
    // Ресурси води
    public class WaterResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Capacity { get; set; }
        public double CurrentLevel { get; set; }
        public string Location { get; set; }
        public int FarmPlotId { get; set; }
        public FarmPlot FarmPlot { get; set; }
    }
}
