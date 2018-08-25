import React from "react";
import qs from "query-string";
import { getJson } from "../getJson";

export default class Court extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courtId: "",
      sheetId: "",
      spreadsheetId: "",
      type: "",
      homeColor: "",
      awayColor: "",
      tournamentId: -1,
      matchId: -1
    };
  }

  async componentDidMount() {
    const {
      courtId = "",
      spreadsheetId = "",
      type = "",
      homeColor = "",
      awayColor = ""
    } = qs.parse(window.location.search);
    console.log(courtId);
    console.log(spreadsheetId);
    let mId = -1;
    let tId = -1;
    if (spreadsheetId && courtId) {
      const { matchId, tournamentId } = await getJson(
        `/api/court/${spreadsheetId}/${courtId}`
      );
      mId = matchId;
      tId = tournamentId;
    }

    this.setState({
      matchId: mId,
      tournamentId: tId,
      courtId,
      spreadsheetId,
      type,
      homeColor,
      awayColor
    });

    // reload every 5 min instead of implementing update logic
    const loadAfter5 = () => {
      window.location = window.location;
    };
    setTimeout(loadAfter5, 60 * 5 * 1000);
  }

  render() {
    const { matchId, tournamentId, type } = this.state;
    console.log(matchId, tournamentId);
    if (matchId == -1 || tournamentId == -1) {
      return (
        <p> Ser ut som noe gikk dårlig, stemmer court og spreadsheetId ? </p>
      );
    }
    console.log(
      `Lets show: http://score.volleystream.no/${type}?tournament=${tournamentId}&match=${matchId}`
    );
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
