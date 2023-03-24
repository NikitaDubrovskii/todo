import {Component} from '@angular/core';
import {CategoryComponent} from "../../model/category/category.component";
import {PriorityComponent} from "../../model/priority/priority.component";
import {TaskComponent} from "../../model/task/task.component";

@Component({
  selector: 'app-test-data',
  templateUrl: './test-data.component.html',
  styleUrls: ['./test-data.component.css']
})
export class TestDataComponent {

  static categories: CategoryComponent[] = [
    {id: 1, title: 'Работа'},
    {id: 2, title: 'Семья'},
    {id: 3, title: 'Учеба'},
    {id: 4, title: 'Отдых'},
    {id: 5, title: 'Спорт'},
    {id: 6, title: 'Еда'},
    {id: 7, title: 'Финансы'},
    {id: 8, title: 'Гаджеты'},
    {id: 9, title: 'Здоровье'},
    {id: 10, title: 'Автомобиль'},
    {id: 11, title: 'Ремонт'},
  ];

  static priorities: PriorityComponent[] = [
    {id: 1, title: 'Низкий', color: '#e5e5e5'},
    {id: 2, title: 'Средний', color: '#85D1B2'},
    {id: 3, title: 'Высокий', color: '#F1828D'},
    {id: 4, title: 'Очень срочно!!', color: '#F1128D'}
  ];

  static tasks: TaskComponent[] = [
    {
      id: 1,
      title: 'Залить бензин полный бак',
      priority: TestDataComponent.priorities[2],
      completed: false,
      category: TestDataComponent.categories[9],
      date: new Date('2019-04-10')
    },

    {
      id: 2,
      title: 'Передать отчеты начальнику управления',
      priority: TestDataComponent.priorities[0],
      completed: false,
      category: TestDataComponent.categories[0],
      date: new Date('2019-04-11')
    },

    {
      id: 3,
      title: 'Убраться у себя в комнате, полить растения',
      priority: TestDataComponent.priorities[2],
      completed: true,
      category: TestDataComponent.categories[1]
    },

    {
      id: 4,
      title: 'Сходить в парк с семьей, пригласить друзей',
      priority: TestDataComponent.priorities[1],
      completed: false,
      category: TestDataComponent.categories[1],
      date: new Date('2019-08-17')
    },
    {
      id: 5,
      title: 'Найти и выучить учебник по квантовой физике',
      completed: false,
      category: TestDataComponent.categories[2]
    },
    {
      id: 6,
      title: 'Сходить на семинар по программированию',
      priority: TestDataComponent.priorities[1],
      completed: true,
      category: TestDataComponent.categories[2],
      date: new Date('2019-06-11')
    },

    {
      id: 7,
      title: 'Найти билеты в Турцию, выбрать отель',
      priority: TestDataComponent.priorities[2],
      completed: false,
      category: TestDataComponent.categories[3]
    },
    {
      id: 8,
      title: 'Приготовить ужин для всей семьи (семга с картошкой)',
      completed: false,
      category: TestDataComponent.categories[5]
    },
    {
      id: 9,
      title: 'Подтянуться 10 раз',
      priority: TestDataComponent.priorities[2],
      completed: false,
      category: TestDataComponent.categories[4],
      date: new Date('2019-03-12')
    },
    {
      id: 10,
      title: 'Пробежать 100 м',
      priority: TestDataComponent.priorities[0],
      completed: true,
      category: TestDataComponent.categories[4]
    },

    {
      id: 11,
      title: 'Организовать детский праздник ',
      completed: false
    },

    {
      id: 12,
      title: 'Сходить на лекцию "Как научиться программировать на Java"',
      priority: TestDataComponent.priorities[1],
      completed: false,
      category: TestDataComponent.categories[2]
    },
    {
      id: 13,
      title: 'Купить продукты на неделю',
      priority: TestDataComponent.priorities[2],
      completed: false,
      category: TestDataComponent.categories[5],
      date: new Date('2019-05-11')
    },

    {
      id: 14,
      title: 'Провести собрание по поводу всех проектов',
      completed: true,
      category: TestDataComponent.categories[0]
    },

    {
      id: 15,
      title: 'Сдать экзамен по Java',
      priority: TestDataComponent.priorities[2],
      completed: true
    },


    {
      id: 16,
      title: 'Положить 100 000 р в банк на депозит',
      priority: TestDataComponent.priorities[3],
      completed: false,
      category: TestDataComponent.categories[6]
    },

    {
      id: 17,
      title: 'Попросить аванс на работе',
      priority: TestDataComponent.priorities[2],
      completed: false,
      category: TestDataComponent.categories[6]
    },

    {
      id: 18,
      title: 'Сдать анализы, проверить гемоглобин',
      priority: TestDataComponent.priorities[3],
      completed: false,
      category: TestDataComponent.categories[8],
      date: new Date('2020-12-11')

    },

    {
      id: 19,
      title: 'Сравнить новый айпад с самсунгом',
      priority: TestDataComponent.priorities[0],
      completed: false,
      category: TestDataComponent.categories[7],
      date: new Date('2019-10-11')

    },

    {
      id: 20,
      title: 'Футбол с сотрудниками',
      priority: TestDataComponent.priorities[0],
      completed: false,
      category: TestDataComponent.categories[4],
      date: new Date('2019-03-17')

    }

  ];

}
