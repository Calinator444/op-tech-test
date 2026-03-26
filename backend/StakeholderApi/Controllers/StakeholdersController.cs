using Microsoft.AspNetCore.Mvc;
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

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var stakeholders = await _stakeholderService.GetAllStakeholdersAsync();
        return Ok(stakeholders);
    }
}
