// @flow
import * as React from 'react'
import * as Kb from '../../common-adapters'
import * as Styles from '../../styles'

export const HeaderTitle = () => (
  <Kb.Box2
    direction="vertical"
    alignItems="flex-start"
    style={styles.headerTitle}
    className="hover-underline-container"
  >
    <Kb.Text type="Header">Git repositories</Kb.Text>
    <Kb.Text type="BodySmall">
      All repositories are end-to-end encrypted.{' '}
      <Kb.Text
        type="BodySmall"
        onClickURL="https://keybase.io/blog/encrypted-git-for-everyone"
        style={styles.headerTitleLink}
        className="hover-underline-child"
      >
        Read how it works.
      </Kb.Text>
    </Kb.Text>
  </Kb.Box2>
)

type HeaderRightActionsProps = {|
  onAddPersonal: () => void,
  onAddTeam: () => void,
|}
const _HeaderRightActions = (props: Kb.PropsWithOverlay<HeaderRightActionsProps>) => (
  <>
    <Kb.Button
      label="New repository"
      onClick={props.toggleShowingMenu}
      small={true}
      ref={props.setAttachmentRef}
      style={styles.newRepoButton}
    />
    <Kb.FloatingMenu
      attachTo={props.getAttachmentRef}
      closeOnSelect={true}
      visible={props.showingMenu}
      onHidden={props.toggleShowingMenu}
      position="bottom center"
      positionFallbacks={[]}
      items={[
        {
          onClick: () => props.onAddPersonal(),
          title: 'New personal repository',
        },
        {
          disabled: Styles.isMobile,
          onClick: Styles.isMobile ? undefined : () => props.onAddTeam(),
          style: Styles.isMobile ? {paddingLeft: 0, paddingRight: 0} : {},
          title: `New team repository${Styles.isMobile ? ' (desktop only)' : ''}`,
        },
      ]}
    />
  </>
)
export const HeaderRightActions = Kb.OverlayParentHOC(_HeaderRightActions)

const styles = Styles.styleSheetCreate({
  headerTitle: {flex: 1, paddingBottom: Styles.globalMargins.xtiny, paddingLeft: Styles.globalMargins.xsmall},
  headerTitleLink: Styles.platformStyles({
    isElectron: {...Styles.desktopStyles.windowDraggingClickable, cursor: 'pointer'},
  }),
  newRepoButton: Styles.platformStyles({
    common: {alignSelf: 'flex-end', marginBottom: 6, marginRight: Styles.globalMargins.xsmall},
    isElectron: Styles.desktopStyles.windowDraggingClickable,
  }),
})
