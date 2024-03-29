# Порядок работы с проектом <!-- omit in toc -->

- [1. GitHub](#1-github)
- [2. Документация](#2-документация)
- [3. git, не очевидное](#3-git-не-очевидное)

## 1. GitHub

- Создаем новую ветку, делаем туда коммиты
- Когда все готово создаем PR в ветку dev
- Проходим кросс-ревью
- Проходим ревью от Яндекса
- Вливаем в ветку dev (через **squash & merge**)
- Оповещаем всех остальных (чтобы они подтянули изменения из dev и сразу порешали merge conflict)

Шаблон названия веток: task/{номер задачи в linear}-{краткое описание})
Например: task/18-readme, task/2-webpack

Все коммиты должны придерживаться строго форматирования по [Conventional Commits](https://www.conventionalcommits.org) Для удобства при создании коммита будет выведена следующая подсказка (если используете консольную работу с гит `$ git commit`, в IDE может не работать):

```
# <тип>[(необязательный контекст)]: <описание>
#
# [необязательное тело]
#
# [необязательная(ые) сноска(и)]
#
# <тип>: обязательно должен быть одним из перечисленных
#        feat      ✨ Добавление нового функционала
#                     (MINOR в Cемантическом Версионировании)
#        fix       🐛 Исправление ошибок
#                     (PATCH в Cемантическом Версионировании).
#        docs      📚 Только обновление документации
#        style     💎 Правки по кодстайлу
#                     (табы, отступы, точки, запятые и т.д.)
#        refactor  📦 Правки кода без исправления ошибок или
#                     добавления новых функций
#        perf      🚀 Изменения направленные на улучшение
#                     производительности
#        test      🚨 Добавление или исправление существующих тестов
#        build     🛠️ Сборка проекта или изменения внешних зависимостей
#        ci        ⚙️ Настройка CI и работа со скриптами
#        chore     ♻️ Другие изменения не модифицирующие
#                     исходный код или тесты
#        revert    🗑️ Откат на предыдущие коммиты
#
# <описание>: должно формулироваться, как продолжение фразы:
#             "В случае применения этого коммита будет...",
#             начинаться с маленькой буквы, быть не длиннее 72 символов
#             и не заканчиваться точкой '.'
#
# [необязательное тело]: должно описывать смысл изменения.
#                        Не "что было поменяно" (это видно в диффе),
#                        не где было поменяно (это тоже было в диффе),
#                        а ПОЧЕМУ.
#
# BREAKING CHANGE: коммит, который имеет сноску BREAKING CHANGE или
# коммит, заканчивающийся восклицательным знаком (!) после типа или
# контекста, вводящий изменение(я), нарушающие обратную совместимость
# (соответствует MAJOR в Cемантическом Версионировании).
# BREAKING CHANGE может быть частью коммита любого типа.
#
# Подробнее смотри: https://www.conventionalcommits.org
#
#-----------------------------------------------------------------------
```

Сообщение коммита при merge PR формируется по такому же принципу как описано выше за исключением того что в него обязательно добавляется номер PR в скобочках после основного сообщения `fix: исправлены ошибки авторизации (#67)`. Все сообщения коммитов из сливаемой ветки вносятся в описание коммита, например:

```
feat: добавлена генерация хеша UUID
  Возникла необходимость сравнивать объекты между собой.

fix(utils): исправлена ошибка падения при появлении юникод символов
  Краткое описание исправленной ошибки.
  BREAKING-CHANGE: метод encode больше не выбрасывает ошибку.

feat(utils): добавлен метод encode
  Метод используется для преобразования строк
```

## 2. Документация

1. Создаем файл для описания чего-либо в папке `docs`
2. Добавляем ссылку на созданный файл в `docs/README.md`

   ```markdown
   - [Название раздела](ИмяФайла.md) - Краткое описание
   ```

3. Пишем документацию. (Если необходимо добавить изображения создаем папку одноименную файлу)

## 3. git, не очевидное

Для разрешения конфликтов `package-lock.json` файла достаточно в процессе merge\`а в терминале выполнить команду `npm install`, которая объединит текущие дерево зависимостей/подзависимостей с тем которое вливается. [Официальная дока npm](https://docs.npmjs.com/cli/v6/configuring-npm/package-locks#resolving-lockfile-conflicts)
