# SIH_INTERNAL_ROUND_1_S.T.A.Rs
# Develop a Cloud-Integrated IoT Alarm Clock with Dashboard Integration


This README provides an overview of the project, including team details, relevant links, tasks completed, tech stack, key features, and steps to run the project locally.

## Team Details

Team Name: S.T.A.Rs

Team Leader: [Ay-2027](https://github.com/Ay-2027)

Team Members:

- MEMBER_1 - 2023UME4163 - [aakash010105](https://github.com/aakash010105)
- MEMBER_2 - 2023UME4179 - [AaryaRatnam](https://github.com/AaryaRatnam)
- MEMBER_3 - 2023UME4195 - [jagrat04](https://github.com/jagrat04)
- MEMBER_4 - 2023UME4207 - [Ay-2027](https://github.com/Ay-2027)
- MEMBER_5 - 2023UCA1908 - [soumya4279](https://github.com/soumya4279)
- MEMBER_6 - 2023UCA1995 - [Susmitahaldar235](https://github.com/Susmitahaldar235)

## Project Links
- Internal Presentation: [Internal Presentation](https://drive.google.com/file/d/1yJJSFnlWGrvUCIu_8PD128eOGNgggRD1/view?usp=sharing)
- Final SIH Presentation: [Final SIH Presentation](https://drive.google.com/file/d/1PHBcMIkQrxdT9XwmywmKp0AdPyL1L8QL/view?usp=sharing)
- Video Demonstration: [Watch Video](https://www.youtube.com/watch?v=1IfW_y87Vvk)
- Source Code: [GitHub Repository](https://github.com/soumya4279/SIH_INTERNAL_ROUND_1_S.T.A.Rs)
- Additional Resources: [Other Relevant Links](https://cloud.appwrite.io/console/project-66d1ee580027d95a6d8e/auth)
  
## Echo Time
Echo time is an IoT clock that can be controlled from your phone from anywhere in the world even on different networks (DEPLOYED)
## Working
Echo Time is a cloud-based software that can be controlled using the expo app which is an expo app hosted on a VM in AWS and is connected using another VM for VPN
## Cloud
Cloud (AWS) has 2 EC2 instances one VPN and the other a server that host app server 
## VPN server 
- A VPN server allows the Expo app to run locally while ensuring that both the app server and the mobile app are virtually on the same network. This setup is crucial for seamless communication and testing during development, as it mimics a shared local network environment even if the devices are physically apart
## app server
- expo app server runs the app and takes logs which then send those logs to a S3 bucket in AWS itself 
## Raspberry PI
Raspberry Pi is a single-board-computer that connects to AWS using IoT tool and takes logs generated when user sets the alarm from the expo app server
![WhatsApp Image 2024-09-02 at 16 15 22_404abee1](https://github.com/user-attachments/assets/f5b08e1b-ba63-42a7-8795-c4d762ae1779)


# Hardware list
- Raspbarry pi 5
- 5 inch lcd
- Buzzer
- Push button

### How to run

go to [Readme.md](/code/README.md) file in code file
