import * as React from 'react';
import * as UtilServices from '../util/util';

class Results extends React.Component<Services.ResultsProps> {

  displayResults = (resultSet:Services.AwardData[]) => {
    let listItems = [];
    for(let i=0; i<resultSet.length; i++) {
      // NOTE: some fields have HTML formatting that doesn't get rendered, but shows up in the data as plain text, we need to strip that for proper display. These fields usually stem from being Rich Text from CommonSpot
      let accountType = UtilServices.prop(resultSet[i], "accountType");
      let amount = UtilServices.prop(resultSet[i], "amount");
      let name = UtilServices.prop(resultSet[i], "name");
      let url = UtilServices.prop(resultSet[i], "url");
      let availability = UtilServices.prop(resultSet[i], "available");
      let deadline = UtilServices.prop(resultSet[i], "deadline");
      let formattedDeadline:string = "";

      // NOTE: format the deadline date to en-US format
      if(deadline !== "1899-12-30 00:00:00") {
        let deadlineDate = new Date(deadline);
        formattedDeadline = deadlineDate.toLocaleDateString("en-US", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
      } else {
        formattedDeadline = "Rolling.";
      }
      
      // NOTE: push the record into the list items array
      listItems.push(
        <div key={`item-${i}`} className="callout">
          <h3><a title={name} href={url} rel="noreferer noopener" >{name}</a></h3>
          <ul className="no-bullet">
            <li><strong>Account Type:</strong> {accountType}</li>
            {(amount.length)? 
              <li><strong>Amount:</strong> {(typeof amount === "number") ? `$` : ``} {amount}</li> : null}
            <li><strong>Deadline:</strong> {formattedDeadline}</li>
            <li><strong>Availability:</strong> {(availability)? "Available" : "Not Currently Available"}</li>
          </ul>
        </div>
      );
    }

    return listItems;
  }
  
  render() {
    if(this.props.resultSet.length) {
      return (
        <div className="grid-x grid-padding-x">
          <div className="cell medium-12">
            <div id="results-display-area">
              {this.displayResults(this.props.resultSet)}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="panel">
          <p>No Results to display that match combination of search parameters. Please try a different combination.</p>
        </div>
      )
    }
  }
}

export default Results;