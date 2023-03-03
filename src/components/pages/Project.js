import { parse, v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from "../layout/Loading";
import Message from "../layout/Message";
import Container from "../layout/Container";
import ProjectForm from "../projects/ProjectForm";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";

import style from "./Project.module.css";

function Project() {

  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState()

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }).then((resp) => resp.json())
        .then((data) => {
          setProject(data);
          setServices(data.services);
        })
        .catch(err => console.log(err)
        );
    }, 500)
  }, [id])

  function editPost(project) {
    setMessage("");

    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projeto!");
      setType("error");
      return false;
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(project),
    }).then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage("Projeto Atualizado!");
        setType("success");
      })
      .catch(err => console.log(err));
  }

  function createService(project) {

    setMessage("");

    const lastService = project.services[project.services.length - 1];
    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(project.cost) + (parseFloat(lastServiceCost));

    if(newCost > parseFloat(project.budget)){
      setMessage("Orçamento ultrapassado, verifique o valor do serviço");
      setType("error");
      project.services.pop();
      return false;
    }

    project.cost = newCost;

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(project),
    }).then((resp) => resp.json())
      .then((data) => {
        setServices(data.services);
        toggleServiceForm();
        setMessage("Serviço Criado!");
        setType("success");
      })
      .catch(err => console.log(err));

  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  function removeService(id, cost){
    setMessage("");

    const serviceUpdated = project.services.filter(
      (service) => service.id !== id
    )

    const projectUpedated = project;

    projectUpedated.services = serviceUpdated;
    projectUpedated.cost = parseFloat(projectUpedated.cost) - parseFloat(cost);

    fetch(`http://localhost:5000/projects/${projectUpedated.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(projectUpedated),
    }).then((resp) => resp.json())
      .then((data) => {
        setProject(projectUpedated);
        setServices(serviceUpdated);
        setType("success");
        setMessage("Serviço removido com sucesso!");
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      {project.name ? (
        <div className={style.project_detais}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={style.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={style.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={style.project_info}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Orçamento Total</span> R${project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado</span> R${project.cost}
                  </p>
                </div>
              ) : (
                <div className={style.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={project} />
                </div>
              )}
            </div>
            <div className={style.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button className={style.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Acionar Serviço" : "Fechar"}
              </button>
              <div className={style.project_info}>
                {showServiceForm && <ServiceForm
                  handleSubmit={createService}
                  btnText="Adicionar serviço"
                  projectData={project}
                />}
              </div>
            </div>
            <h2>Serviços:</h2>
            <Container customClass="start">
              {services.length > 0 && (
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))
              )}
              {services.length === 0 && <p>Não há serviços cadastrados.</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Project;