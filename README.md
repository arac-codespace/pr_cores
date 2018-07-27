# Experiment - Creating visualizations for core data
- Data: https://pubs.usgs.gov/of/2014/1227/ofr2014-1227-data_catalog.html

<img src=https://i.imgur.com/Z5yUGAn.png>

---
# Description:
This project uses Django + React + D3 frameworks/libraries to create a visual representation of the geologic data collected from ocean surveys near the island of Puerto Rico.  The data structure is based around survey SJ008's available data, and it includes models for Lithology, GrainSize and Core Logging data among others.  The only dataset included on this application for now is the SJ008 dataset.  I'll be adding and testing datasets from other surveys in the future.  

This application uses the Django Framework to serve the data recorded in the database to React in JSON format.  D3 is only given DOM control when rendering the chart axes, the rest of the time D3 is used only for its functions while React is in charge of drawing the dom according to D3's "instructions".

---

# Comments:
I actually intended to use a 3D JS library in an attempt to display the spacial arrangement of the core data on a map.  Unfortunately, my computer's not quite strong enough to deal with 3D visualizations so I'll put this project on hold.

---
# References:

Setup React + Django etc
http://v1k45.com/blog/modern-django-part-1-setting-up-django-and-react/

SVG to Component
https://svgr.now.sh/

D3
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