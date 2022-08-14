import { Flex, Link, Image, Input, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Menu, MenuButton, Select, useToast } from "@chakra-ui/react";
import React, {useState, useRef, useEffect} from "react";
import Axios, * as others from 'axios';
import styled from "styled-components";
import { ObjectDetector } from "./objectDetector";

import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from "./utilities";



const Playground = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [listOfUsers, setListOfUsers] = useState([]);
    const [email, setEmail] = useState("");
    const [wrong, setWrong] = useState("");


    const [cam, setCam] = useState(true);

    const toast = useToast()

    useEffect(() => {
        Axios.get("http://localhost:3001/getUsers").then((response) => {
          setListOfUsers(response.data);
        });
      }, []);
    
      const createUser = () => {
        Axios.post("http://localhost:3001/createUsers", {
          email
        }).then((response) => {
          setListOfUsers([
            ...listOfUsers,
            {
              email
            },
          ]);
        });
      };

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    function checkEmail(email){
        console.log(email);
        if (validateEmail(email)){
            setWrong('');
            if (listOfUsers === null) {

                toast({
                  title: 'Email registered.',
                  description: "Email is registered in the database",
                  status: 'success',
                  duration: 2000,
                  isClosable: true,
                })
                createUser();
          
              } else {
                
                
                Axios.get("http://localhost:3001/getUsers").then((response) => {
                  for (var i = 0; i < (response.data).length; i++){
                    if ((response.data)[i]['email'] === email){
                      toast({
                        title: 'Email is already registered.',
                        description: "Email is already registered...",
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                      })
                      return;
                    }
                  }
                  toast({
                    title: 'Email registered.',
                    description: "Email is registered in the database",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                  })
                  createUser();
                })
              }
        }else{
            setWrong('Email is incorrect!')
        }
    }




    const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    const net = await cocossd.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx); 
    }
  };

  useEffect(()=>{runCoco()},[]);




    return (
        <Flex direction={'column'} background={'rgb(0, 0, 0)'} width = {'100%'} height = {cam? '120vh' : '100%'}>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Newsletter Subscription</ModalHeader>
                <ModalCloseButton />
                <Flex alignItems={'center'} direction = {'column'}>
                    <Text>Enter Your Email Here:</Text>
                    <Input type = "email" width={'80%'} value = {email} onChange = {(e) => setEmail(e.target.value)}/>
                    <Text color={'red'}>{wrong}</Text>
                    <ModalFooter>
                        {/**Use Mongo and usestate for signup */}
                        <Button onClick={() => {
                            checkEmail(email)
                        }} variantColor="blue" mr={3}>
                        Sign Up
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </Flex>
                </ModalContent>
            </Modal>

            <Flex backgroundColor={'#101010'} direction={'row'} alignItems = {'center'} justifyContent = {'center'} borderBottom = {'0.5px solid #cbcbcb'} padding = {2}>
                <Image src={require('./images/logo.png')} width = {'3vw'} height = {'3vw'} />
                <Text bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize = {'2.2vw'} fontWeight = {900}>&nbsp;&nbsp;&nbsp;&nbsp;ObjectsAI&nbsp;&nbsp;</Text>
                <Text color={'white'} fontSize = {'1.7vw'} fontWeight = {400}>
                    is&nbsp;&nbsp;possible&nbsp;&nbsp;due&nbsp;&nbsp;to&nbsp;&nbsp;
                </Text>
                <Link href="https://katyhacks.org/" color={'white'} fontSize = {'1.3vw'} fontWeight = {400}>
                    <Image src = {require('./images/katyyouth.png')} width = {'21vw'} height = {'2vw'} />
                </Link>
            </Flex>
            <Flex direction={'row'} alignItems = {'center'} gap = {'2vw'} padding = {2}>
               <Link href="/" width={'12vw'} height = {'3vw'}>
                    <Image src = {require('./images/FirstNav.png')} />
               </Link>
               <Link href = {"/Product"} color={'white'} fontSize = {'1.3vw'} fontWeight = {400}>
                    Product
               </Link>
               <Link href = {"/Solutions"} color={'white'} fontSize = {'1.3vw'} fontWeight = {400}>
                    Solutions
               </Link>
               <Link href = {"/SocialInequality"} color={'white'} fontSize = {'1.3vw'} fontWeight = {400}>
                    Social Inequality
               </Link>
               <Link href = {"/Playground"} color={'white'} fontSize = {'1.3vw'} fontWeight = {400}>
                    Playground
               </Link>
               <Link onClick={onOpen} position={'absolute'} right = {'3vw'} color={'white'} fontSize = {'1.3vw'} fontWeight = {400}>
                    Join →
               </Link>
               <Link onClick={(e) => {
                    window.location.href = "mailto:ben.sloutsky@gmail.com";
                    e.preventDefault();
                }} position={'absolute'} right = {'9vw'} color={'white'} fontSize = {'1.3vw'} fontWeight = {400}>
                    Contact
               </Link>
            </Flex>
            <br/>
            <Flex gap = {0} direction = {'row'} alignItems = {'center'} justifyContent = {'center'} marginBottom = {"5vh"}>
                <Button onClick={() => setCam(true)} fontSize = {'3vw'} background = {cam ? "#fff" : "#cbcbcb"} height = {'8vh'} padding = {5} borderLeft = {'1px solid black'} borderBottom = {'1px solid black'} borderTop = {'1px solid black'} borderTopLeftRadius = {20} borderBottomLeftRadius = {20} borderTopRightRadius = {0} borderBottomRightRadius = {0}>Webcam</Button>
                <Button onClick={() => setCam(false)} fontSize = {'3vw'} background = {cam ? "#cbcbcb" : "#fff"} height = {'8vh'} padding = {5} borderBottom = {'1px solid black'} borderRight = {'1px solid black'} borderTop = {'1px solid black'} borderTopLeftRadius = {0} borderBottomLeftRadius = {0} borderTopRightRadius = {20} borderBottomRightRadius = {20}>Image</Button>
            </Flex>
            { cam ? 
            <div backgroundColor = {"#000"}>
                <header backgroundColor = {"#000"}>
                    <Webcam
                    ref={webcamRef}
                    muted={true} 
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        top: '34vh',
                        textAlign: "center",
                        zindex: 9,
                        width: 640,
                        height: 480,
                    }}
                    />

                <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    top: '34vh',
                    textAlign: "center",
                    zindex: 8,
                    width: 640,
                    height: 480,
                }}
                />
            </header>
        </div>
        :
        <Flex direction={'column'} alignItems = {'center'} justifyContent = {'center'}>
            <ObjectDetector/>
            <br/><br/><br/>
            <hr style={{
                borderColor: 'white',
                }}/><br/>
            <Flex direction={'row'} alignItems = {'center'} justifyContent = {'center'}>
                <Text color={'white'}>© Copyright KatyYouthHacks, Objects AI inc. 2022</Text>
            </Flex>
            <br/>
        </Flex>
        }
    
        </Flex>
    );
}

export default Playground;