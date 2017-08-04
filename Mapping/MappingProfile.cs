using _mosh_A2.Controllers.Resources;
using _mosh_A2.Models;
using AutoMapper;
using System.Linq;
using System.Collections.Generic;
using _mosh_A2.Core.Models;

namespace _mosh_A2.Mapping
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            // Domain to API Resource
            CreateMap<AdditionalInfo, AdditionalInfoResource>();
            CreateMap<AdditionalInfo, SaveAdditionalInfoResource>();
            CreateMap<Logo, LogoResource>();
            CreateMap<Logo, KeyValuePairResource>();
            CreateMap<Photo, PhotoResource>();
            CreateMap(typeof(QueryResult<>), typeof(QueryResultResource<>));
            CreateMap<Make, MakeResource>();
            CreateMap<Make, KeyValuePairResource>();
            CreateMap<Model, KeyValuePairResource>();
            CreateMap<Model, ModelResource>();
            CreateMap<ModelResource, KeyValuePairResource>();
            CreateMap<Feature, KeyValuePairResource>();
            CreateMap<Vehicle, SaveVehicleResource>()
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.ContactName, 
                                                                                           Email = v.ContactEmail,
                                                                                           Phone = v.ContactPhone }))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => vf.FeatureId)));
            CreateMap<Vehicle, VehicleResource>()
                .ForMember(vr => vr.Make, opt => opt.MapFrom(v => v.Model.Make))
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.ContactName, 
                                                                                           Email = v.ContactEmail,
                                                                                           Phone = v.ContactPhone }))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => new KeyValuePairResource { Id = vf.Feature.Id, 
                                                                                                                    Name = vf.Feature.Name })));

            // API Resource to Domain
            CreateMap<VehicleQueryResource, VehicleQuery>();
            CreateMap<KeyValuePairResource, ModelResource>();
            CreateMap<SaveModelResource, Model>();
            CreateMap<SaveMakeResource, Make>();
            CreateMap<KeyValuePairResource, Feature>();
            CreateMap<AdditionalInfoResource, AdditionalInfo>();
            CreateMap<SaveAdditionalInfoResource, AdditionalInfo>()
                .ForMember(v => v.Id, opt => opt.Ignore());
            CreateMap<KeyValuePairResource, Model>();

            CreateMap<SaveVehicleResource, Vehicle>()
                .ForMember(v => v.Id, opt => opt.Ignore())
                .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
                .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
                .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
                .ForMember(v => v.Features, opt => opt.Ignore())
                .AfterMap((vr, v) => {
                    // Remove unselected features
                    var removeFeatures = v.Features.Where(f => !vr.Features.Contains(f.FeatureId)).ToList();
                    foreach(var f in removeFeatures){
                            v.Features.Remove(f);
                    }
                    // Add new features
                    var addedFeatures = vr.Features.Where(id => !v.Features.Any(f => f.FeatureId == id)).Select(id => new VehicleFeature { FeatureId = id });
                    foreach( var f in addedFeatures ) {
                         v.Features.Add(f);
                    }
                });
        }
    }
}