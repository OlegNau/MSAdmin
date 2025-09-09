using AutoMapper;
using Nomium.MergeSensei.Entities;
using Nomium.MergeSensei.Projects.Dtos;

namespace Nomium.MergeSensei.Projects;

public class ProjectMapper : Profile
{
    public ProjectMapper()
    {
        CreateMap<Project, ProjectDto>();
        CreateMap<ProjectDto, Project>();
    }
} 