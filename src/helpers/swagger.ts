import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";


const options: swaggerJsdoc.Options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Letgo Clone API Docs",
        description: `Development By <a href="https://github.com/FRTYZ" target="_blank">Fırat YILDIZ</a>`,
        version,
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ["./src/routes/*.ts", "./src/schema/*.ts"],
  
};

const swaggerSpec = swaggerJsdoc(options);


function swaggerDocs(app: Express) {
    // Swagger page
    app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
      customCss : `
          .swagger-ui .topbar { 
            background-color: #ff3f55;
            padding: 5px 0;
            text-align: center;
            color: white
          }
          .swagger-ui .topbar svg {
            display: none
          }
        `
        customSiteTitle: 'Letgo Clone API'
      }
    ));
  
    // Docs in JSON format
    app.get("/docs.json", (req: Request, res: Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });
    
  }
  
  export default swaggerDocs;
