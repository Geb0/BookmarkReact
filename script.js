/*
 * script.js
 * Application main script
 *
 */

"use strict";

function arraySort(data, orderBy) {

    orderBy = Array.isArray(orderBy) ? orderBy : [orderBy];

    return data.sort((a, b) => {

        for (let i = 0, size = orderBy.length; i < size; i++) {

            const key = Object.keys(orderBy[i])[0],
                o = orderBy[i][key],
                valueA = a[key],
                valueB = b[key];

            if (!(valueA || valueB)) {

                console.error("arraySort: key '" + key + "' not exist");
                return [];
            }

            if (+valueA === +valueA) {

                return o.toLowerCase() === 'desc'
                       ? valueB - valueA
                       : valueA - valueB;

            } else {

                if (valueA.localeCompare(valueB) > 0) {

                    return o.toLowerCase() === 'desc' ? -1 : 1;

                } else if (valueA.localeCompare(valueB) < 0) {

                    return o.toLowerCase() === 'desc' ? 1 : -1;
                }
            }
        }
    });
}

class Site extends React.PureComponent {

    constructor(props) {

        super(props);

        this.cat = props.site.cat;
        this.name = props.site.name;
        this.icon = props.site.icon;
        this.href = props.site.href;

        this.siteClick = this.siteClick.bind(this);
    }

    siteClick() {

        window.open(this.href, '_blank');
    }

    render() {

        return <div className="site" onClick={this.siteClick}>
            <div>{this.name.substring(0, 17)}</div>
            <img src={'./img/' + this.icon} />
        </div>;
    }
}

function CategoryRowFunction({category}) {

    return <div className="category">{CATEGORIES[category]}</div>;
}

const CategoryRow = React.memo(CategoryRowFunction);

function SitesTable({sites, cat, text}) {

    var lastCategory = null;

    var rows = [];

    arraySort(sites, [{cat : 'asc'}, {name: 'asc'}]).forEach(site => {

        if(cat != '' && site.cat != cat) {

            return;
        }

        if(text != '' && site.name.toLowerCase().indexOf(text) == -1) {

            return;
        }

        if(site.cat != lastCategory) {

            lastCategory = site.cat;

            rows.push(<CategoryRow
                category={site.cat}
                key={"cat" + site.cat}
            />);
        }

        rows.push(<Site site={site} key={"prod" + site.name} />);
    });

    return <div id="result">{rows}</div>;
}

class SearchBar extends React.Component {

    constructor(props) {

        super(props);

        this.handleCatChange = this.handleCatChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleCatChange(e) {

        this.props.onCatChange(e.target.value);
    }

    handleTextChange(e) {

        this.props.onTextChange(e.target.value);
    }

    render() {

        const {cat, text} = this.props;

        const categories = {

            ...{'' : "Category..."},
            ... CATEGORIES
        };

        return <div className="search">
            <form className="form-inline">
                <Select
                    id="cat"
                    name="cat"
                    value={cat}
                    options={categories}
                    onChange={this.handleCatChange}
                    labelClassName="d-none"
                />
                <input
                    type="text"
                    id="text"
                    name="text"
                    value={text}
                    className="form-control"
                    placeholder="Search..."
                    onChange={this.handleTextChange}
                />
            </form>
        </div>;
    }
}

class GetList extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            cat: '',
            text: ''
        };

        this.handleCatChange = this.handleCatChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleCatChange(cat) {

        this.setState({cat: cat});
    }

    handleTextChange(text) {

        this.setState({text: text.toLowerCase()});
    }

    render() {

        return <div>
            <SearchBar
                cat={this.state.cat}
                text={this.state.text}
                onCatChange={this.handleCatChange}
                onTextChange={this.handleTextChange}
            />
      <SitesTable
        sites={SITES}
        cat={this.state.cat}
        text={this.state.text}
      />
        </div>;
    }
}

ReactDOM.render(<GetList />, document.getElementById('main'));
