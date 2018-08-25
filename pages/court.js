import React from "react";
import qs from "query-string";
import { getJson } from "../getJson";
export default class Court extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   courtId: "",
    //   sheetId: "",
    //   spreadsheetId: "",
    //   type: "",
    //   homeColor: "",
    //   awayColor: "",
    //   tournamentId: "",
    //   matchId: ""
    // };
  }

  static async getInitialProps({ query, isServer }) {
    const {
      courtId,
      spreadsheetId,
      type,
      homeColor = "",
      awayColor = ""
    } = query;

    const { matchId, tournamentId } = getJson(
      `/api/court/${spreadsheetId}/${courtId}`
    );
    return {
      matchId,
      tournamentId,
      courtId,
      spreadsheetId,
      type,
      homeColor,
      awayColor
    };
  }

  componentDidMount() {
    // reload every 5 min instead of implementing update logic
    setTimeout(() => (window.location = window.location), 60 * 5 * 1000);
  }
  render() {
    const { matchId, tournamentId, type } = this.props;
    if (matchId == -1 || tournamentId == -1) {
      return (
        <p> Ser ut som noe gikk dårlig, stemmer court og spreadsheetId ? </p>
      );
    }
    return (
      <React.Fragment>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <main>
          <div id="wrap">
            <iframe
              id="frame"
              src={`http://score.volleystream.no/${type}?tournament=${tournamentId}&match=${matchId}`}
            />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

// Todo: are we able to zoom and show all current courts? that whould be fun!
const styles = `
  #wrap { width: 600px; height: 390px; padding: 0; overflow: hidden; }
  #frame { width: 800px; height: 520px; border: 1px solid black; }
  #frame { zoom: 0.75; -moz-transform: scale(0.75); -moz-transform-origin: 0 0; }
`;
