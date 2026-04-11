using Microsoft.AspNetCore.Mvc;
using StakeholderApi.Models;
using StakeholderApi.Services;

namespace StakeholderApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StakeholdersController : ControllerBase
{
    private readonly IStakeholderService _stakeholderService;

    public StakeholdersController(IStakeholderService stakeholderService)
    {
        _stakeholderService = stakeholderService;
    }


    [HttpPost]
    [Route("add")]
    public async Task<IActionResult> Create(Stakeholder stakeholder)
    {
        var result = await _stakeholderService.AddStakeholderAsync(stakeholder);
        if (!result.IsSuccess)
        {
            return BadRequest(result.Errors.First());
        }
        
        return Created(result.Value.Id.ToString(), result.Value);
    }

    [HttpDelete]
    [Route("delete/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _stakeholderService.DeleteStakeholderAsync(id);
        return NoContent();
    }

    [HttpGet]
    [Route("email-exists")]
    public async Task<IActionResult> EmailExists(string email)
    {
        var emailExists = await  _stakeholderService.EmailExists(email);
        return Ok(emailExists);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var stakeholders = await _stakeholderService.GetAllStakeholdersAsync();
        return Ok(stakeholders);
    }
}
