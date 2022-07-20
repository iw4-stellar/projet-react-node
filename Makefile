.PHONY: server client install start stop restart production

start:
	docker-compose up --detach

stop:
	docker-compose down --remove-orphans --volumes --timeout 0

restart: stop start

install: start
	docker-compose exec node npm install

server: install
	docker-compose exec node npm --workspace server run dev

client: install
	docker-compose exec node npm --workspace client run dev

production: install
	docker-compose exec node npm --workspaces run build
