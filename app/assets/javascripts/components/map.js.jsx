class Map extends React.Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      kmlFiles: [],
      lat: 37.096528,
      lng: -113.568416,
      zoom: 13,
      filter: {
        length: {
          short: false,
          medium: false,
          long: false,
          very_long: false,
        },
        difficulty: {
          easy: false,
          moderate: false,
          strenuous: false,
          extreme: false,
        },
        season: {
          spring: false,
          summer: false,
          fall: false,
          winter: false,
        }
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

  allFalse(category = null) {
    const { filter } = this.state;
    const values = category ? _.values(filter[category]) :  _.flatten(_.map(filter, _.values));

    return values.every((item) => {
      return !item;
    });
  }

  filterKmlLayers() {
    const { filter, kmlFiles } = this.state;
    if (!this.allFalse()) {
      kmlFiles.map((kmlFile) => {
        let { kmlLayer } = kmlFile;
        const lengthFilter = filter['length'][kmlFile.length] || this.allFalse('length');
        const difficultyFilter = filter['difficulty'][kmlFile.difficulty] || this.allFalse('difficulty');
        const seasonFilter = filter['season'][kmlFile.season] || this.allFalse('season');
        if (lengthFilter && difficultyFilter && seasonFilter) {
          if (kmlLayer.map == null) {
            kmlLayer.setMap(this.map)
          }
        } else if (kmlLayer.map != null) {
          kmlLayer.setMap(null)
        }
      });
    }
  }

  onInputChange(kind, event) {
    const { name, checked } = event.target;
    const { filter } = _.clone(this.state);
    filter[kind][name] = checked
    this.setState({filter})
  }

  renderCheckbox(options = {}) {
    const { category, name, label } = options;
    return (
      <div className="form-group no-margin">
        <div className="checkbox">
          <label>
            <input
              checked={this.state.filter[name]}
              name={name}
              onChange={this.onInputChange.bind(this, category)}
              type="checkbox"
            />
            {label || _.capitalize(name)}
          </label>
        </div>
      </div>
    );
  }

  render () {
    return (
      <div className="row">
        <div className="col-sm-2">
          <div className="checkbox-group">
            <h5>Length</h5>
            {this.renderCheckbox({name: "short", category: "length", label: "1-2 Hours"})}
            {this.renderCheckbox({name: "medium", category: "length", label: "4-6 Hours"})}
            {this.renderCheckbox({name: "long", category: "length", label: "6-9 Hours"})}
            {this.renderCheckbox({name: "very_long", category: "length", label: "10-12 Hours"})}
          </div>
          <div className="checkbox-group">
            <h5>Difficulty</h5>
            {this.renderCheckbox({name: "easy", category: "difficulty", label: "Family (Easy)"})}
            {this.renderCheckbox({name: "moderate", category: "difficulty"})}
            {this.renderCheckbox({name: "strenuous", category: "difficulty"})}
            {this.renderCheckbox({name: "extreme", category: "difficulty"})}
          </div>
          <div className="checkbox-group">
            <h5>Season</h5>
            {this.renderCheckbox({name: "spring", category: "season"})}
            {this.renderCheckbox({name: "summer", category: "season"})}
            {this.renderCheckbox({name: "fall", category: "season"})}
            {this.renderCheckbox({name: "winter", category: "season"})}
          </div>
        </div>
        <div className="col-sm-10">
          <div id="map" ref="myMap" />
        </div>
      </div>
    );
  }
}

