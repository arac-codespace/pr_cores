# Experiment - Creating visualizations for core data
- https://pubs.usgs.gov/of/2014/1227/ofr2014-1227-data_catalog.html
---

# Todos:
- Prepare database structure
- Feed core data to database
- Serve it through the Django API
- Fetch it with react
- Do stuff with it...

# References:
- https://medium.com/@Elijah_Meeks/interactive-applications-with-react-d3-f76f7b3ebc71
- https://www.smashingmagazine.com/2018/02/react-d3-ecosystem/

Data structure...

CoreDescription
- Smear Slides
- Grain Size
- Location
- Multi Sensor Core Logger
- Age Dates

Allow for future expedition data...

Survey > Survey_Samples < Samples  > Strata
                                   > Radiographs
                                   > SmearSlides
                                   > GrainSize
                                   > Location? (make it available from top model?)
                                   > MultiSensor
                                   > AgeDates
                                   > XRayFluorescence
---
# BrainStorm Data Structure

Publication
  samples_referenced 
  ???

//Sample (Extend class)
  cores_publication (ManyToMany)
  sample_no
  survey (O2O)
  date_coll
  depth
  lat
  lng
  field_activity
  collected_by
  
//Survey:
  SurveyId
  Ship/Platform

//Core(Sample)
  length(cm)
  core_type
  core_condition
  analyst
  location 
  sections
  liner_length
  core_length

//Strata
  core_id (ManyToOne)
  color? - missing/ambiguous info?
  thickness
  description
  fossils
  lithology
  unconformities

//Fossils 
  (note: I won't be creating a separate fossil table.
  Instead, I might make use of the PaleoDb for illustrations )
  name
  alt_name
  abundance
  strata_id (ManyToOne)

// Lithology
  strata_lithology (ManytoMany)
  lithology_name

// Unconformities
  strata_unconformity (ManyToMany)
  position (from 0 cm)
  description?
  unconformity_type?

// UnconformityType?
  name
  img_file_name?
  unconformities_unconformity_type (ManyToMany)


//Bag(Sample)
  description
  


  MSCL (MultiSensorCoreData)
  XRF (XRayFluorescence)
  Radiograph
  GrainSize
  RadioCarbo
  SmearSlide