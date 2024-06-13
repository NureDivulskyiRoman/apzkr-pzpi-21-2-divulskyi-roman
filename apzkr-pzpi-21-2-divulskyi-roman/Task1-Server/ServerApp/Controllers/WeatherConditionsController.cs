using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerApp.Database;
using ServerApp.Models;

namespace ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherConditionsController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public WeatherConditionsController(DataBaseContext context)
        {
            _context = context;
        }

        // GET: api/WeatherConditions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WeatherCondition>>> GetWeatherConditions()
        {
            return await _context.WeatherConditions.ToListAsync();
        }

        // GET: api/WeatherConditions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WeatherCondition>> GetWeatherCondition(int id)
        {
            var weatherCondition = await _context.WeatherConditions.FindAsync(id);

            if (weatherCondition == null)
            {
                return NotFound();
            }

            return weatherCondition;
        }

        // PUT: api/WeatherConditions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWeatherCondition(int id, WeatherCondition weatherCondition)
        {
            if (id != weatherCondition.Id)
            {
                return BadRequest();
            }

            _context.Entry(weatherCondition).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WeatherConditionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/WeatherConditions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<WeatherCondition>> PostWeatherCondition(WeatherCondition weatherCondition)
        {
            _context.WeatherConditions.Add(weatherCondition);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWeatherCondition", new { id = weatherCondition.Id }, weatherCondition);
        }

        // DELETE: api/WeatherConditions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWeatherCondition(int id)
        {
            var weatherCondition = await _context.WeatherConditions.FindAsync(id);
            if (weatherCondition == null)
            {
                return NotFound();
            }

            _context.WeatherConditions.Remove(weatherCondition);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WeatherConditionExists(int id)
        {
            return _context.WeatherConditions.Any(e => e.Id == id);
        }
    }
}
