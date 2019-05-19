package com.app.OpenHack.Service;

import java.util.HashSet;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.OpenHack.GlobalConst;
import com.app.OpenHack.entity.ErrorMessage;
import com.app.OpenHack.entity.Hackathon;
import com.app.OpenHack.entity.Team;
import com.app.OpenHack.entity.TeamJoinRequest;
import com.app.OpenHack.entity.TeamMember;
import com.app.OpenHack.entity.User;
import com.app.OpenHack.repository.HackathonRepository;
import com.app.OpenHack.repository.TeamJoinRequestRepository;
import com.app.OpenHack.repository.TeamMemberRepository;
import com.app.OpenHack.repository.TeamRepository;
import com.app.OpenHack.repository.UserRepository;
import com.app.OpenHack.util.SendEmail;

@Service
@Transactional
public class TeamService {

	@Autowired
	TeamRepository teamRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	HackathonRepository hackathonRepository;
	
	@Autowired
	TeamJoinRequestRepository teamJoinRequestRepository;
	
	@Autowired
	TeamMemberRepository teamMemberRepository;
	
	@Autowired
	SendEmail sendEmail;
	
	public Team addTeam(User user,Long hackathonId,String teamName) {
		Hackathon hackathon = hackathonRepository.findById(hackathonId).get();
		
		Team team = new Team();
		team.setHackathon(hackathon);
		team.setName(teamName);
		team = teamRepository.save(team);
		inviteToTeam(team.getId(),user.getUuid(),"Lead");
		return team;
	}
	
	public ResponseEntity<?> inviteToTeam(Long teamId,String uuid,String role) {
		Team team = teamRepository.findById(teamId).get();
		
		User u = userRepository.findById(uuid).get();
		
		for(Team t:team.getHackathon().getTeams()) {
			for(TeamMember m:t.getMembers()) {
				if(m.getMember().getUuid().equals(uuid))
					//throw new IllegalArgumentException("User already Registered");
				return new ResponseEntity<>(new ErrorMessage("User already Registered"),HttpStatus.BAD_REQUEST);
			}
		}
		
		String randomId = UUID.randomUUID().toString();
		
		teamRepository.save(team);
		TeamJoinRequest teamJoinRequest = new TeamJoinRequest();
		teamJoinRequest.setTeamId(team.getId());
		teamJoinRequest.setUserId(u.getUuid());
		teamJoinRequest.setRole(role);
		teamJoinRequest.setToken(randomId);
		teamJoinRequestRepository.save(teamJoinRequest);
		long t1 = System.currentTimeMillis();
		sendEmail.sendEmail(u.getEmail(), "Request to join team : "+team.getName(), GlobalConst.UI_URL+"team/payment?token="+randomId);
		return new ResponseEntity<>(HttpStatus.CREATED);

	}
	
	public void acceptTeamInvite(String token) {
		TeamJoinRequest teamJoinRequest = teamJoinRequestRepository.findByToken(token);
		Team team = teamRepository.findById(teamJoinRequest.getTeamId()).get();
		for(Team t:team.getHackathon().getTeams())
			teamJoinRequestRepository.deleteByUserIdAndTeam(teamJoinRequest.getUserId(), t.getId());
		
		teamJoinRequestRepository.flush();
		User u = userRepository.findById(teamJoinRequest.getUserId()).get();
		if(team.getMembers()==null)
			team.setMembers(new HashSet<TeamMember>());
		TeamMember teamMember = new TeamMember();
		teamMember.setMember(u);
		teamMember.setJoined(true);
		teamMember.setPaid(true);
		teamMember.setRole(teamJoinRequest.getRole());
		teamMember.setTeam(team);
		teamMemberRepository.save(teamMember);
		
		sendEmail.sendEmail(u.getEmail(), "Payment Confirmation", "Your payment of "+team.getHackathon().getFees()+"$ received.");
	}
	
	public Team submitHackathon(Long teamId,String submitionUrl) {
		Team team = teamRepository.findById(teamId).get();
		team.setSubmitionUrl(submitionUrl);
		teamRepository.save(team);
		return team;
	}
	
	public void gradeTeam(Long teamId,float f) {
		Team team = teamRepository.findById(teamId).get();
		team.setGrades(f);
		teamRepository.save(team);
	}
}
