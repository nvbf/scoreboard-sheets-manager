import React from "react";
export default () => (
  <React.Fragment>
    <style dangerouslySetInnerHTML={{ __html: styles }} />
    <main>
      <div id="wrap">
        This is not implemented yet
        {/* <iframe
          id="frame"
          src="http://score.volleystream.no/scoreboard?matchId=test"
        /> */}
      </div>
    </main>
  </React.Fragment>
);

// Todo: are we able to zoom and show all current courts? that whould be fun!
const styles = `
  #wrap { width: 600px; height: 390px; padding: 0; overflow: hidden; }
  #frame { width: 800px; height: 520px; border: 1px solid black; }
  #frame { zoom: 0.75; -moz-transform: scale(0.75); -moz-transform-origin: 0 0; }
`;
