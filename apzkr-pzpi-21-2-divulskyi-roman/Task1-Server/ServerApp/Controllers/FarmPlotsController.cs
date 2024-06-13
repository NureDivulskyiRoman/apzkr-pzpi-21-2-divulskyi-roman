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
    public class FarmPlotsController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public FarmPlotsController(DataBaseContext context)
        {
            _context = context;
        }

        // GET: api/FarmPlots
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FarmPlot>>> GetFarmPlots()
        {
            return await _context.FarmPlots.ToListAsync();
        }

        // GET: api/FarmPlots/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FarmPlot>> GetFarmPlot(int id)
        {
            var farmPlot = await _context.FarmPlots.FindAsync(id);

            if (farmPlot == null)
            {
                return NotFound();
            }

            return farmPlot;
        }

        // PUT: api/FarmPlots/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFarmPlot(int id, FarmPlot farmPlot)
        {
            if (id != farmPlot.Id)
            {
                return BadRequest();
            }

            _context.Entry(farmPlot).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FarmPlotExists(id))
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

        // POST: api/FarmPlots
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FarmPlot>> PostFarmPlot(FarmPlot farmPlot)
        {
            _context.FarmPlots.Add(farmPlot);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFarmPlot", new { id = farmPlot.Id }, farmPlot);
        }

        // DELETE: api/FarmPlots/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFarmPlot(int id)
        {
            var farmPlot = await _context.FarmPlots.FindAsync(id);
            if (farmPlot == null)
            {
                return NotFound();
            }

            _context.FarmPlots.Remove(farmPlot);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FarmPlotExists(int id)
        {
            return _context.FarmPlots.Any(e => e.Id == id);
        }
    }
}
