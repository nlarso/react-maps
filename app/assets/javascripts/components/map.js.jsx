class Map extends React.Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      kmlFiles: [],
      lat: 37.096528,
      lng: -113.568416,
      zoom: 13,
      filterOptions: {
        short: false,
        medium: false,
        long: false,
        very_long: false,
        easy: false,
        moderate: false,
        strenuous: false,
        extreme: false,
        spring: false,
        summer: false,
        fall: false,
        winter: false,
      }
    }
  }

  componentDidMount() {
    this.fetchKmlFiles()
    this.map = this.createMap()
  }

  componentDidUpdate() {
    this.filterKmlLayers()
  }

  createMap() {
    const { lat, lng, zoom } = this.state;
    const options = {
      center: { lat: lat, lng: lng },
      zoom: zoom
    };
    return new google.maps.Map(this.refs.myMap, options);
  }

  fetchKmlFiles() {
    const url = '/admin/day_hikes.json'
    $.get(url, kmlFiles => {
      kmlFiles.map((kmlFile, index) => {
        const url = kmlFile.kml_file.kml_file.url;
        kmlFiles[index]['kmlLayer'] = this.createKmlLayer(url)
      });
      this.setState({kmlFiles});
    });
  }

  createKmlLayer(url) {
    kmlOptions = {
      map: null,
      preserveViewport: true,
      suppressInfoWindows: false,
    }
    return new google.maps.KmlLayer(url, kmlOptions);
  }

  filterKmlLayers() {
    const { filterOptions, kmlFiles } = this.state;
    kmlFiles.map((kmlFile) => {
      let { kmlLayer } = kmlFile
      if (filterOptions[kmlFile.length] || filterOptions[kmlFile.difficulty] || filterOptions[kmlFile.season]) {
        if (kmlLayer.map == null) {
          kmlLayer.setMap(this.map)
        }
      } else {
        if (kmlLayer.map != null) {
          kmlLayer.setMap(null)
        }
      }
    });
  }

  onInputChange(event) {
    const { name, checked } = event.target;
    const { filterOptions } = this.state;
    filterOptions[name] = checked
    this.setState({filterOptions})
  }

  renderCheckbox(name, label = null) {
    return (
      <div className="form-group no-margin">
        <div className="checkbox">
          <label>
            <input type="checkbox" name={name} onChange={this.onInputChange} checked={this.state.filterOptions[name]} />
            {label || _.capitalize(name)}
          </label>
        </div>
      </div>
    );
  }

  render () {
    const { filterOptions } = this.state;
    return (
      <div className="row">
        <div className="col-sm-2">
          <div className="checkbox-group">
            <h5>Length</h5>
            {this.renderCheckbox("short", "1-2 Hours")}
            {this.renderCheckbox("medium", "4-6 Hours")}
            {this.renderCheckbox("long", "6-9 Hours")}
            {this.renderCheckbox("very_long", "10-12 Hours")}
          </div>
          <div className="checkbox-group">
            <h5>Difficulty</h5>
            {this.renderCheckbox("easy", "Family (Easy)")}
            {this.renderCheckbox("moderate")}
            {this.renderCheckbox("strenuous")}
            {this.renderCheckbox("extreme")}
          </div>
          <div className="checkbox-group">
            <h5>Season</h5>
            {this.renderCheckbox("spring")}
            {this.renderCheckbox("summer")}
            {this.renderCheckbox("fall")}
            {this.renderCheckbox("winter")}
          </div>
        </div>
        <div className="col-sm-10">
          <div id="map" ref="myMap" />
        </div>
      </div>
    );
  }
}

