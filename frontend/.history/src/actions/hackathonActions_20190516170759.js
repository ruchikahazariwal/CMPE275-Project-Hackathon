import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import {
  GET_HACKATHON,
  GET_HACKATHONS,
  GET_ERRORS,
  GET_JUDGES,
  GET_GRADE_HACKATHONS,
  GET_HACKERS,
  JOIN_HACKATHON
} from "./types";

export const createHackathon = (data, history) => dispatch => {
  axios
    .post("/hackathon", data)
    .then(res => {
      console.log(res);
      dispatch({
        type: GET_HACKATHON,
        payload: res.data
      });
      alert("Hackathon created");
      history.push("/dashboard");
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const getJudges = () => dispatch => {
  console.log("get judges action");
  axios
    .get("/user/hackers")
    .then(res => {
      dispatch({
        type: GET_JUDGES,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const getHackers = () => dispatch => {
  console.log("get hackers action");
  axios
    .get("/user/hackers")
    .then(res => {
      dispatch({
        type: GET_HACKERS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const getHackathons = () => dispatch => {
  console.log("here");
  axios
    .get("/hackathon/all")
    .then(res => {
      //console.log(res);
      dispatch({
        type: GET_HACKATHONS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const getHackathon = id => dispatch => {
  console.log("here");
  axios
    .get(`/hackathon/${id}`)
    .then(res => {
      //console.log(res);
      dispatch({
        type: GET_HACKATHON,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const getSponsors = () => dispatch => {
  console.log("get sponsor action");
  axios
    .get("/user/hackers")
    .then(res => {
      dispatch({
        type: GET_JUDGES,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const getGradeHackathons = () => dispatch => {
  console.log("get Hcakathons to be graded action");
  axios.get("/hackathon/judging").then(res => {
    console.log("INside get grade hackathon");
    console.log(res);
    dispatch({
      type: GET_GRADE_HACKATHONS,
      payload: res.data
    });
  });
};

export const startHackathon = id => dispatch => {
  console.log("here");

  axios
    .put(`/hackathon/start/${id}`)
    .then(res => {
      //console.log(res);
      dispatch({
        type: GET_HACKATHON,
        payload: res.data
      });
      alert("Hackathon started");
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const joinHackathon = () => dispatch => {
  console.log("here");

  axios
    .get("/hackathon")
    .then(res => {
      console.log("response");
      console.log(res);
      dispatch({
        type: JOIN_HACKATHON,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

// set profile name
export const createTeam = (data,history) => dispatch => {
  //const id= ${id}
  const registerData = {
    hackathonId: data.hackathonId,
    teamName: data.teamName
  };
  const TeamMembers = data.TeamMembers;

  axios
    .post(`/hackathon/register`, registerData)
    .then(res => {
      console.log(res.data);
      // var inviteData1 = {};
      console.log(TeamMembers);

      TeamMembers.map(item => {
        var inviteData1 = {
          teamId: Number(res.data.id),
          uuid: item.name,
          role: item.role
        };

        console.log(item.name);
        console.log(inviteData1);
        axios
          .post("/team/invite", inviteData1)
          .then(res1 => {console.log(res1)
          history.push("/dashboard")})
          .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: err
            })
          );
      });
      // console.log(inviteData);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

export const endHackathon = id => dispatch => {
  console.log("here");

  axios
    .put(`/hackathon/end/${id}`)
    .then(res => {
      //console.log(res);
      dispatch({
        type: GET_HACKATHON,
        payload: res.data
      });
      alert("Hackathon has ended");
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};