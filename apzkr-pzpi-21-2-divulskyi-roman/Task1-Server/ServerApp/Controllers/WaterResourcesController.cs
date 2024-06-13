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
    public class WaterResourcesController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public WaterResourcesController(DataBaseContext context)
        {
            _context = context;
        }

        // GET: api/WaterResources
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WaterResource>>> GetWaterResources()
        {
            return await _context.WaterResources.Include(f => f.FarmPlot).ToListAsync();
        }

        // GET: api/WaterResources/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WaterResource>> GetWaterResource(int id)
        {
            var waterResource = await _context.WaterResources.FindAsync(id);

            if (waterResource == null)
            {
                return NotFound();
            }

            return waterResource;
        }

        // PUT: api/WaterResources/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWaterResource(int id, WaterResource waterResource)
        {
            if (id != waterResource.Id)
            {
                return BadRequest();
            }

            _context.Entry(waterResource).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WaterResourceExists(id))
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

        // POST: api/WaterResources
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<WaterResource>> PostWaterResource(WaterResource waterResource)
        {
            _context.WaterResources.Add(waterResource);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWaterResource", new { id = waterResource.Id }, waterResource);
        }

        // DELETE: api/WaterResources/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWaterResource(int id)
        {
            var waterResource = await _context.WaterResources.FindAsync(id);
            if (waterResource == null)
            {
                return NotFound();
            }

            _context.WaterResources.Remove(waterResource);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WaterResourceExists(int id)
        {
            return _context.WaterResources.Any(e => e.Id == id);
        }
    }
}
