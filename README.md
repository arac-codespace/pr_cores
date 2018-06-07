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

Setup React + Django etc
http://v1k45.com/blog/modern-django-part-1-setting-up-django-and-react/

//SVG to Component
https://svgr.now.sh/

//D3
https://github.com/freddyrangel/playing-with-react-and-d3
https://hackernoon.com/how-and-why-to-use-d3-with-react-d239eb1ea274
https://medium.com/@caspg/responsive-chart-with-react-and-d3v4-afd717e57583
https://medium.com/@Elijah_Meeks/interactive-applications-with-react-d3-f76f7b3ebc71
https://www.smashingmagazine.com/2018/02/react-d3-ecosystem/

DjangoRestFramework
https://wsvincent.com/django-rest-framework-react-tutorial/

django-nested-admin
https://www.bedjango.com/blog/how-use-django-nested-admin/

Data publication source
https://pubs.usgs.gov/of/2014/1227/ofr2014-1227-data_catalog.html

Conrad rc08 and 09
https://www.ngdc.noaa.gov/geosamples/showsample.jsp?imlgs=imlgs0059479&fac=LDEO&cru=RC08&smp=115&dev=core,%20piston&inst=LDEO
https://www.ngdc.noaa.gov/nndc/struts/results?op_28=eq&t=101477&s=1&d=2&v_28=01015008
https://www.ngdc.noaa.gov/mgg/geology/data/robert_d._conrad/rc08/115/rc08_115pc_description.pdf
https://www.ngdc.noaa.gov/mgg/geology/data/robert_d._conrad/rc09/ - Archived samples

SJ008
https://www.ngdc.noaa.gov/geosamples/leg.jsp?leg=SJ008

Sample Map and other
https://maps.ngdc.noaa.gov/viewers/sample_index/index.html?institution=DSDP
https://www.ngdc.noaa.gov/geosamples/listsamples.jsp look for conrad rc0808 or 09 cruise


- CoreDescription
  - Smear Slides
  - Grain Size
  - Location
  - Multi Sensor Core Logger
  - Age Dates

Allow for future expedition data..

---
# BrainStorm Data Structure

- Publication
  - samples_referenced 
 
- Sample (Extend class)
  - cores_publication (ManyToMany)
  - sample_no
  - survey (O2O)
  - date_coll
  - depth
  - lat
  - lng
  - field_activity
  - collected_by
  
- Survey:
  - SurveyId
  - Ship/Platform

- Core(Sample)
  - length(cm)
  - core_type
  - core_condition
  - analyst
  - location 
  - sections
  - liner_length
  - core_length

- Strata
  - core_id (ManyToOne)
  - color? - missing/ambiguous info?
  - thickness
  - description
  - fossils
  - lithology
  - unconformities

- Fossils (might use PaleoDB for illustrations, etc...)
  - name
  - alt_name
  - abundance
  - strata_id (ManyToOne)

- Lithology
  - strata_lithology (ManytoMany)
  - lithology_name

- Unconformities
  - strata_unconformity (ManyToMany)
  - position (from 0 cm)
  - description?
  - unconformity_type?

- UnconformityType?
  - name
  - img_file_name?
  - unconformities_unconformity_type (ManyToMany)


- Bag(Sample)
  - description
  


  MSCL (MultiSensorCoreData)
  XRF (XRayFluorescence)
  Radiograph
  GrainSize
  RadioCarbo
  SmearSlide