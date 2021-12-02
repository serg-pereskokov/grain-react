const layers = type => {
  const layouts = {
    osm: {
        layout: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        subdomains: null
      },
    googleStreets: {
      layout: 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      subdomains: ['mt0','mt1','mt2','mt3']
    },
    googleHybrid: {
      layout: 'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
      subdomains: ['mt0','mt1','mt2','mt3']
    },
    googleSat: {
      layout: 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      subdomains: ['mt0','mt1','mt2','mt3']
    },
    googleTerran: {
      layout: 'http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
      subdomains: ['mt0','mt1','mt2','mt3']
    }
  }

  return {...layouts[type], type}
}

export { layers }