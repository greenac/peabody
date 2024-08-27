FROM public.ecr.aws/docker/library/node:current-alpine3.20

WORKDIR /src/peabody
ADD . .

RUN yarn install

EXPOSE 3000

CMD [ "yarn", "dev" ]
